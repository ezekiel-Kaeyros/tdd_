"""functions python version."""
from typing import List
from xml.etree import ElementTree as ET
import pandas as pd
from tqdm import tqdm


NAMESPACES = {
    "xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "xmlns:time": "http://www.w3.org/2006/time#",
    "xmlns:eumd": "http://entsoe.eu/ns/Metadata-European#",
    "xmlns:eu": "http://iec.ch/TC57/CIM100-European#",
    "xmlns:nc": "http://entsoe.eu/ns/nc#",
    "xmlns:prov": "http://www.w3.org/ns/prov#",
    "xmlns:md": "http://iec.ch/TC57/61970-552/ModelDescription/1#",
    "xmlns:dcat": "http://www.w3.org/ns/dcat#",
    "xmlns:cim": "http://iec.ch/TC57/CIM100#",
    "xmlns:dcterms": "http://purl.org/dc/terms/#",
}

# 'xmlns:amp': 'http://amprion.net/CIM/Extensions#',
# 'xmlns:pid': 'http://powerinfo.us/Assigned-URI/1#',
# 'xmlns:cim': 'http://iec.ch/TC57/2013/CIM-schema-cim16#',
# 'xmlns:pti': 'http://www.pti-us.com/PTI_CIM-schema-cim16#',
# 'xmlns:entsoe': 'http://entsoe.eu/CIM/SchemaExtension/3/1#',
# 'xmlns:entsoe2': 'http://entsoe.eu/CIM/SchemaExtension/3/2#',
# 'xmlns:md': 'http://iec.ch/TC57/61970-552/ModelDescription/1#'}


class Converter:
    """
    This class converts an Excel file to XML in specific ETNSO-E format

    Parameters:
    -------------
        inputpath: str
            Path to Excel file which shall be converted
        outputpath: str
            Path to save newly created XML files to
        output_filenames: List[str]
            List of filenames to save XML files to
        namespaces: dict = NAMESPACES
            Dictionary containing all namespaces
    """

    def __init__(
        self,
        inputpath: str,
        outputpath: str,
        output_filenames: List[str],
        # namespaces: dict,
    ):
        # set vars
        self.inputpath = inputpath
        self.outputpath = outputpath
        self.output_filenames = output_filenames
        # self.namespaces = namespaces
        self.namespaces = NAMESPACES

        self.clean_excel()
        self.register_namespaces()
        self.create_xml()
        self.save_xml()

    def clean_excel(self):
        """functions clean doc."""
        self.df = pd.read_excel(self.inputpath)

    def register_namespaces(self):
        """functions namespaces."""
        for prefix, uri in self.namespaces.items():
            ET.register_namespace(prefix, uri)

    def create_xml(self):
        """functions to create xml."""
        # empty dictionary to store filepath: xml-tree pairs in
        self.trees = {}
        for i in tqdm(list(range(len(self.df.columns) - 1))):
            tqdm.write(f"Creating {self.output_filenames[i]}...")

            # get the col
            col = self.df.columns[i + 1]
            # create tree from col
            tree = self.create_xml_tree(col)

            # store in self.trees dictionary
            self.trees[self.output_filenames[i]] = tree

    def create_xml_tree(self, col):  # pylint: disable=too-many-locals, too-many-statements
        """functions to create xml tree."""

        # function that checks if there is a attribute stored
        # in "value" field
        def is_attribute(_str):
            if isinstance(_str, str):
                pass
            else:
                _str = str(_str)
            return "rdf:" in _str

        # function that sets attribute if there is one
        def set_attribute(_str):
            attrib = {}
            key = _str.split("=")[0]
            val = _str.split("=")[1].replace('"', "")

            attrib[key] = val

            return attrib

        # slice out DF only with "FIELD" column and data for this file
        df = self.df[["FIELD", col]]

        # get the "level" of the value, representing to which tag
        # this value is an SubElement
        # in the excel file, each SubLevel is seperated by an /
        df["level"] = self.df["FIELD"].str.split("/").apply(len)

        # create the root and a tree
        root = ET.Element("rdf:RDF", self.namespaces)
        tree = ET.ElementTree(root)

        def level_one(row):
            if is_attribute(row[col]):
                attrib = set_attribute(row[col])
                row[col] = ""
            else:
                attrib = None
            elem = ET.Element(row["FIELD"], attrib=attrib)
            elem.text = str(row[col])
            root.append(elem)
            level_elem = elem
            return level_elem

        def level_two(row):
            if is_attribute(row[col]):
                attrib = set_attribute(row[col])
                row[col] = ""
                elem = ET.Element(row["FIELD"].split("/")[1], attrib=attrib)
                elem.text = str(row[col])
                level_elem.append(elem)
            else:
                attrib = None
                elem = ET.Element(row["FIELD"].split("/")[1])
                elem.text = str(row[col])
                level_elem.append(elem)
            return level_elem

        def level_three(row):
            if is_attribute(row[col]):
                attrib = set_attribute(row[col])
                row[col] = ""
                elem = ET.Element(row["FIELD"].split("/")[2], attrib=attrib)
                elem.text = row[col]
                level_elem.text.text = elem

            else:
                attrib = None
                elem = ET.Element(row["FIELD"].split("/")[2])
                elem.text = row[col]
                level_elem.text.text = elem
            return level_elem

        def level_four(row):
            if is_attribute(row[col]):
                attrib = set_attribute(row[col])
                row[col] = ""
                elem = ET.Element(row["FIELD"].split("/")[3], attrib=attrib)
                elem.text = row[col]
                level_elem.text.text.text = elem
            else:
                attrib = None
                elem = ET.Element(row["FIELD"].split("/")[3])
                elem.text = row[col]
                level_elem.text.text.text = elem
            return level_elem

        level = {
            1: level_one,
            2: level_two,
            3: level_three,
            4: level_four,
        }

        # def get_level():

        # iterate over the rows in the dataframe
        for idx, row in df.iterrows():
            # set the attribute according to level
            # so far a depth of 4 levels is implemented, which should
            # be enough
            func = level.get(row["level"])
            level_elem = func(row)
            # if row["level"] == 1:
            #     level_elem = level_one(row)
            # elif row["level"] == 2:
            #     # print(row)
            #     level_elem = level_two(row)
            # elif row["level"] == 3:
            #     level_elem = level_three(row)

            # elif row["level"] == 4:
            #     level_elem = level_four(row)
        # return the finished XML tree
        return tree

    def save_xml(self):
        """functions save xml."""
        # iterate over keys (filenames) and values (xml trees)
        # in dictionary and save it to the outputpath
        for filename, tree in self.trees.items():
            ET.indent(tree, space="\t", level=0)
            tree.write(
                file_or_filename=self.outputpath + filename,
                encoding="UTF-8",
                xml_declaration=True,
            )
