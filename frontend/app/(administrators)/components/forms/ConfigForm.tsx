'use client';
import { Button } from '@/components/Button';
import InputField from '@/components/forms/InputField';
import { notifySuccess } from '@/components/notifications/SuccessNotification';
import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SuperAdminContext } from '../../context/admin.context';
import { updateConfigFile } from '../../actions/update-configfile';
import { getTSOConfigFile } from '../../actions/get-tso-configFile';
import { notifyError } from '@/components/notifications/ErrorNotification';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';

interface IFormInput {
  FullModel_dcterms_Model_creator: string;
  FullModel_dcterms_Model_conformsTo_RemedialActionSchedule: string;
  FullModel_dcterms_Model_conformsTo_PowerSchedule: string;
  FullModel_dcterms_Model_license: string;
  FullModel_eumd_Model_applicationSoftware: string;
  FullModel_dcterms_Model_description: string;
  FullModel_md_Model_wasAttributedTo: string;
  RemedialActionCost_nc_RemedialActionCost_kind: string;
  PowerSchedule_cim_IdentifiedObject_description: string;
  PowerSchedule_nc_BaseTimeSeries_interpolationKind: string;
  RemedialActionScheduleAcceptance_nc_RemedialActionScheduleAcceptance_kind: string;
  RedispatchScheduleAction_nc_PowerScheduleAction_currency: string;
  CountertradeScheduleAction_nc_PowerScheduleAction_currency: string;
  eic: string;
  clients: string;
}

const ConfigForm: React.FC = () => {
  const { state } = useContext(SuperAdminContext);
  const [formValues, setFormValues] = useState<Object>({});
  const [error] = useState(false);
  const [getCurrentTSO] = useLocalStorage('currentTso');

  const currentTSO = getCurrentTSO();
  var company = currentTSO?.company;
  const { register, handleSubmit, setValue } = useForm<IFormInput>();

  //SUbmitting form
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    var tso = currentTSO?.company;
    var tsoAbbreviation = currentTSO?.tsoAbbreviation;

    const bodyContent = {
      'FullModel/dcterms:Model.creator': {
        [`${tso}`]: data.FullModel_dcterms_Model_creator,
      },
      'FullModel/dcterms:Model.conformsTo.RemedialActionSchedule': {
        [`${tso}`]:
          data.FullModel_dcterms_Model_conformsTo_RemedialActionSchedule,
      },

      'FullModel/dcterms:Model.conformsTo.PowerSchedule': {
        [`${tso}`]: data.FullModel_dcterms_Model_conformsTo_PowerSchedule,
      },

      'FullModel/dcterms:Model.license': {
        [`${tso}`]: data.FullModel_dcterms_Model_license,
      },

      'FullModel/eumd:Model.applicationSoftware': {
        [`${tso}`]: data.FullModel_eumd_Model_applicationSoftware,
      },

      'FullModel/dcterms:Model.description': {
        [`${tso}`]: data.FullModel_dcterms_Model_description,
      },
      'FullModel/md:Model.wasAttributedTo': {
        [`${tso}`]: data.FullModel_md_Model_wasAttributedTo,
      },

      // Here new
      clients: {
        [`${tsoAbbreviation}`]: data.clients,
      },
      // New

      'RemedialActionCost/nc:RemedialActionCost.kind': {
        ['value1']: 'provisonal',
        ['value2']: 'indicativ',
        ['value3']: 'final',
        [`${tso}`]: data.RemedialActionCost_nc_RemedialActionCost_kind,
      },
      'PowerSchedule/cim:IdentifiedObject.description': {
        [`${tso}`]: data.PowerSchedule_cim_IdentifiedObject_description,
      },
      'PowerSchedule/nc:BaseTimeSeries.interpolationKind': {
        [`${tso}`]: data.PowerSchedule_nc_BaseTimeSeries_interpolationKind,
      },
      // New here
      EIC: {
        [`${tso}`]: data.eic,
      },
      // New here
      'RemedialActionScheduleAcceptance/nc:RemedialActionScheduleAcceptance.kind':
        {
          [`${tso}`]:
            data.RemedialActionScheduleAcceptance_nc_RemedialActionScheduleAcceptance_kind,
        },
      'RedispatchScheduleAction/nc:PowerScheduleAction.currency': {
        [`${tso}`]:
          data.RedispatchScheduleAction_nc_PowerScheduleAction_currency,
      },

      'CountertradeScheduleAction/nc:PowerScheduleAction.currency': {
        [`${tso}`]:
          data.CountertradeScheduleAction_nc_PowerScheduleAction_currency,
      },
      tso: {
        [`${tsoAbbreviation}`]: data?.clients,
      },
    };

    // Submiting the config files to save
    try {
      const result = await updateConfigFile(`${company}`, bodyContent);

      if (result?.status === 200) {
        notifySuccess('Saved successfully');
      } else {
        // Something went wrong
        notifyError('Something went wrong, try again');
      }
    } catch (error) {
      notifyError(`${error}`);
    }
  };

  // UseEffect to get the form data to set into the fields

  useEffect(() => {
    async function fetchForm() {
      const result = await getTSOConfigFile(`${company}`);

      setFormValues(result);
      //;
    }

    fetchForm();
    // Setting default values

    setValue(
      'CountertradeScheduleAction_nc_PowerScheduleAction_currency',
      'https://iec.ch/TC57/CIM100#Currency.EUR'
    );
    setValue('eic', '10XDE-VE-TRANSMK');
    setValue(
      'FullModel_dcterms_Model_conformsTo_PowerSchedule',
      'http://entsoe.eu/ns/CIM/PowerSchedule-EU/2.2'
    );
    setValue(
      'FullModel_dcterms_Model_conformsTo_RemedialActionSchedule',
      'http://entsoe.eu/ns/CIM/RemedialActionSchedule-EU/2.2'
    );
    setValue('FullModel_dcterms_Model_creator', '10XDE-VE-TRANSMK');
    setValue(
      'FullModel_dcterms_Model_description',
      'This is an example of  remedial action schedule profile.'
    );
    setValue(
      'FullModel_dcterms_Model_license',
      'https://creativecommons.org/licenses/by/4.0/'
    );
    setValue('FullModel_eumd_Model_applicationSoftware', 'TDD-Tool');
    setValue('FullModel_md_Model_wasAttributedTo', '10XDE-VE-TRANSMK');
    setValue(
      'PowerSchedule_cim_IdentifiedObject_description',
      'Power schedule for the redispatch action'
    );

    setValue(
      'PowerSchedule_nc_BaseTimeSeries_interpolationKind',
      'http://entsoe.eu/ns/nc#TimeSeriesInterpolationKind.none'
    );

    setValue(
      'RedispatchScheduleAction_nc_PowerScheduleAction_currency',
      'https://iec.ch/TC57/CIM100#Currency.EUR'
    );

    setValue('RemedialActionCost_nc_RemedialActionCost_kind', 'provisonal');
    setValue(
      'RemedialActionScheduleAcceptance_nc_RemedialActionScheduleAcceptance_kind',
      'http://entsoe.eu/ns/nc#TimeSeriesInterpolationKind.next'
    );
    setValue('clients', `${company?.toString()}`);

    return () => {};
  }, [company, setValue]);

  try {
    let entries = Object?.entries(formValues);
    if (entries.length !== 0 && !error) {
      let first: any = Object.values(entries[0][1])[0];
      let second: any = Object.values(entries[1][1])[0];
      let third: any = Object.values(entries[2][1])[0];
      let fourth: any = Object.values(entries[3][1])[0];
      let fifth: any = Object.values(entries[4][1])[0];
      let sixth: any = Object.values(entries[5][1])[0];
      let seventh: any = Object.values(entries[6][1])[0];
      let eighth: any = Object.values(entries[7][1])[0];
      let nineth: any = Object.values(entries[8][1])[0];
      let tenth: any = Object.values(entries[9][1])[0];
      let eleventh: any = Object.values(entries[10][1])[0];
      let twelveth: any = Object.values(entries[11][1])[0];
      let thirteenth: any = Object.values(entries[12][1])[0];
      let fourteenth: any = Object.values(entries[13][1])[0];
      let fifteenth: any = Object.values(entries[14][1])[0];

      // Setting the fields
      setValue(
        'CountertradeScheduleAction_nc_PowerScheduleAction_currency',
        first
      );
      setValue('eic', second);
      setValue('FullModel_dcterms_Model_conformsTo_PowerSchedule', third);
      setValue(
        'FullModel_dcterms_Model_conformsTo_RemedialActionSchedule',
        fourth
      );
      setValue('FullModel_dcterms_Model_creator', fifth);
      setValue('FullModel_dcterms_Model_description', sixth);
      setValue('FullModel_dcterms_Model_license', seventh);
      setValue('FullModel_eumd_Model_applicationSoftware', eighth);
      setValue('FullModel_md_Model_wasAttributedTo', nineth);
      setValue('PowerSchedule_cim_IdentifiedObject_description', tenth);

      setValue('PowerSchedule_nc_BaseTimeSeries_interpolationKind', eleventh);

      setValue(
        'RedispatchScheduleAction_nc_PowerScheduleAction_currency',
        twelveth
      );

      setValue('RemedialActionCost_nc_RemedialActionCost_kind', thirteenth);
      setValue(
        'RemedialActionScheduleAcceptance_nc_RemedialActionScheduleAcceptance_kind',
        fourteenth
      );
      setValue('clients', fifteenth);
    }
  } catch (error) {
    notifyError(`${error}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="font-bold text-4xl">{state.currentTSO?.company}</div>

      <div className="mt-8">
        <InputField
          name="clients"
          placeholder="Enter config here"
          type="text"
          value={currentTSO?.company}
          disabled={true}
          props={{
            ...register('clients'),
          }}
          title="Client
          "
          id="clients"
        />
      </div>
      <div className="mt-8">
        <InputField
          name="FullModel_dcterms_Model_creator"
          placeholder="Enter config here"
          type="text"
          props={{
            ...register('FullModel_dcterms_Model_creator', {
              required: true,
            }),
          }}
          title="FullModel/dcterms:Model.creator"
          id="FullModel_dcterms_Model_creator"
        />
      </div>
      <div className="mt-8">
        <InputField
          name="FullModel_dcterms_Model_conformsTo_RemedialActionSchedule"
          placeholder="Enter config here"
          type="text"
          props={{
            ...register(
              'FullModel_dcterms_Model_conformsTo_RemedialActionSchedule',
              { required: true }
            ),
          }}
          title="FullModel/dcterms:Model.conformsTo.RemedialActionSchedule"
          id="FullModel_dcterms_Model_conformsTo_RemedialActionSchedule"
        />
      </div>
      <div className="mt-8">
        <InputField
          name="FullModel_dcterms_Model_conformsTo_PowerSchedule"
          placeholder="Enter config here"
          type="text"
          props={{
            ...register('FullModel_dcterms_Model_conformsTo_PowerSchedule', {
              required: true,
            }),
          }}
          title="FullModel/dcterms:Model.conformsTo.PowerSchedule
          "
          id="FullModel_dcterms_Model_conformsTo_PowerSchedule"
        />
      </div>
      <div className="mt-8">
        <InputField
          name="FullModel_dcterms_Model_license"
          placeholder="Enter config here"
          type="text"
          props={{
            ...register('FullModel_dcterms_Model_license', {
              required: true,
            }),
          }}
          title="FullModel/dcterms:Model.license
          "
          id="FullModel_dcterms_Model_license"
        />
      </div>
      <div className="mt-8">
        <InputField
          name="eic"
          placeholder="Enter config here"
          type="text"
          props={{
            ...register('eic', { required: true }),
          }}
          title="EIC
          "
          id="eic"
        />
      </div>

      <div className="mt-8">
        <InputField
          name="FullModel_eumd_Model_applicationSoftware"
          placeholder="Enter config here"
          type="text"
          props={{
            ...register('FullModel_eumd_Model_applicationSoftware', {
              required: true,
            }),
          }}
          title="FullModel/eumd:Model.applicationSoftware          "
          id="FullModel_eumd_Model_applicationSoftware"
        />
      </div>
      <div className="mt-8">
        <InputField
          name="FullModel_dcterms_Model_description"
          placeholder="Enter config here"
          type="text"
          props={{
            ...register('FullModel_dcterms_Model_description', {
              required: true,
            }),
          }}
          title="FullModel/dcterms:Model.description"
          id="FullModel_dcterms_Model_description"
        />
      </div>
      <div className="mt-8">
        <InputField
          name="FullModel_md_Model_wasAttributedTo"
          placeholder="Enter config here"
          type="text"
          props={{
            ...register('FullModel_md_Model_wasAttributedTo', {
              required: true,
            }),
          }}
          title="FullModel/md:Model.wasAttributedTo"
          id="FullModel_md_Model_wasAttributedTo"
        />
      </div>
      <div className="mt-8">
        <InputField
          name="RemedialActionCost_nc_RemedialActionCost_kind"
          placeholder="Enter config here"
          type="text"
          props={{
            ...register('RemedialActionCost_nc_RemedialActionCost_kind', {
              required: true,
            }),
          }}
          title="RemedialActionCost/nc:RemedialActionCost.kind"
          id="RemedialActionCost_nc_RemedialActionCost_kind"
        />
      </div>
      <div className="mt-8">
        <InputField
          name="PowerSchedule_cim_IdentifiedObject_description"
          placeholder="Enter config here"
          type="text"
          props={{
            ...register('PowerSchedule_cim_IdentifiedObject_description', {
              required: true,
            }),
          }}
          title="PowerSchedule/cim:IdentifiedObject.description
          "
          id="PowerSchedule_cim_IdentifiedObject_description"
        />
      </div>
      <div className="mt-8">
        <InputField
          name="PowerSchedule_nc_BaseTimeSeries_interpolationKind"
          placeholder="Enter config here"
          type="text"
          props={{
            ...register('PowerSchedule_nc_BaseTimeSeries_interpolationKind', {
              required: true,
            }),
          }}
          title="PowerSchedule/nc:BaseTimeSeries.interpolationKind
          "
          id="PowerSchedule_nc_BaseTimeSeries_interpolationKind"
        />
      </div>
      <div className="mt-8">
        <InputField
          name="RemedialActionScheduleAcceptance_nc_RemedialActionScheduleAcceptance_kind"
          placeholder="Enter config here"
          type="text"
          props={{
            ...register(
              'RemedialActionScheduleAcceptance_nc_RemedialActionScheduleAcceptance_kind',
              { required: true }
            ),
          }}
          title="RemedialActionScheduleAcceptance/nc:RemedialActionScheduleAcceptance.kind
          "
          id="RemedialActionScheduleAcceptance_nc_RemedialActionScheduleAcceptance_kind"
        />
      </div>

      <div className="mt-8">
        <InputField
          name="RedispatchScheduleAction_nc_PowerScheduleAction_currency"
          placeholder="Enter config here"
          type="text"
          props={{
            ...register(
              'RedispatchScheduleAction_nc_PowerScheduleAction_currency',
              { required: true }
            ),
          }}
          title="RedispatchScheduleAction/nc:PowerScheduleAction.currency
          "
          id="RedispatchScheduleAction_nc_PowerScheduleAction_currency"
        />
      </div>

      <div className="mt-8">
        <InputField
          name="CountertradeScheduleAction_nc_PowerScheduleAction_currency"
          placeholder="Enter config here"
          type="text"
          props={{
            ...register(
              'CountertradeScheduleAction_nc_PowerScheduleAction_currency',
              { required: true }
            ),
          }}
          title="CountertradeScheduleAction/nc:PowerScheduleAction.currency
          :
          "
          id="CountertradeScheduleAction_nc_PowerScheduleAction_currency"
        />
      </div>
      <div className="my-12">
        <Button>Save</Button>
      </div>
    </form>
  );
};

export default ConfigForm;
