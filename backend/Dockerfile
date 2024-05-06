FROM python:3.11

# Create app directory
WORKDIR /app

# This is wrong!

COPY requirements.txt ./
COPY .env ./

# Install app dependencies
RUN pip install --upgrade pip

RUN pip install -r requirements.txt

# Bundle app source
COPY . .

EXPOSE 5000
CMD [ "flask", "run","--host","0.0.0.0","--port","5000"]