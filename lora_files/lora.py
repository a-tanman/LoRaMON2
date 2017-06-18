#!/usr/bin/python
#Using python2.7

import serial
import time
from collections import namedtuple
import threading
import requests
import sys
import traceback
import os
import binascii
from datetime import datetime
import json

def beginLora(serialPort):
    global ser
    ser = serial.Serial(serialPort, 9600, timeout=5)

def check(resp, code):
    if resp.status_code != code:
        print("Expected %s. Got %s %s" % (code, resp.status_code, resp.text))
        return 1
        sys.exit(1)
    else:
        return 0

s = requests.Session()
url = "http://172.16.1.68:7000"
arrayNodes = []
port = '/dev/ttyUSB0'
ser = 0
beginLora(port)
readSettings=b'\xFF\x56\xAE\x35\xA9\x55\xF0\x00\x10'
readSettings2=b'\xFF\x56\xAE\x35\xA9\x55\xF0\x10\x08'

dataToSend=b'\x55\xAB\x0D\x00\x00\x00\x00\x00\x00'
errorToSend=b'\x55\xAB\x0E\x00\x00\x00\x00\x00\x00'
counter = 0
dataOrError = 0
numOfDataRecords = 0

dataCode = b'\x0A'
errorCode = b'\x0E'

def main():
    print "Starting main function\n"
    while 1:        
        line1 = []
        linehex = []
        try:
            line=ser.readline()
            for c in line:
                line1 = line1 + [ord(c)]
                linehex = linehex + [format(ord(c), "#04X")]
            print 'Printing line here:', linehex, line1
            if len(line1) > 18:
                if (line1[16] == 78) & (line1[18] == 10):
                    print 'The analog value is: ', line1[17]
                    o = {
                        "id":1,
                        "date_time": str(datetime.now()),
                        "voltage": line1[17],
                    }
                try:
                    headers = {'content-type': 'application/json'}
                    resp = s.post(url, data=json.dumps(o), timeout=5.0, headers=headers)
                    retVal = check(resp, 200)
                    #return retVal
                    print (resp.content)
                except:
                    print ("Waited too long while sending data online.")
                print 'Uploaded to cloud'
        except:
            print ("Something went wrong with the serial port.")
    time.sleep(3)

if __name__ == "__main__":
    main()    
