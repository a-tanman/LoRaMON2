/*
  Software serial multple serial test
 
 Receives from the hardware serial, sends to software serial.
 Receives from software serial, sends to hardware serial.
 
 The circuit: 
 * RX is digital pin 10 (connect to TX of other device)
 * TX is digital pin 11 (connect to RX of other device)
 
 Note:
 Not all pins on the Mega and Mega 2560 support change interrupts, 
 so only the following can be used for RX: 
 10, 11, 12, 13, 50, 51, 52, 53, 62, 63, 64, 65, 66, 67, 68, 69
 
 Not all pins on the Leonardo support change interrupts, 
 so only the following can be used for RX: 
 8, 9, 10, 11, 14 (MISO), 15 (SCK), 16 (MOSI).
 
 created back in the mists of time
 modified 25 May 2012
 by Tom Igoe
 based on Mikal Hart's example
 
 This example code is in the public domain.
 
 */
#include <SoftwareSerial.h>

SoftwareSerial mySerial(10, 11); // RX, TX
uint8_t packet[20] = {0}; 
uint32_t gwAddr = 21931;
int sensorValue;
uint8_t outputValue;

void setup()  
{
  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
  sensorValue = analogRead(A0);

  packet[0] = gwAddr >> 8;
  packet[1] = gwAddr & 0x000000ff;  
  packet[2] = 'N';
  packet[3] = sensorValue;
  
  Serial.println("Goodnight moon!");

  // set the data rate for the SoftwareSerial port
  mySerial.begin(9600);
  mySerial.write(packet, 20);
}

void loop() // run over and over
{
  delay(2000);
  sensorValue = analogRead(A0);
  outputValue = map(sensorValue, 0, 1023, 0, 12);
  memset(packet, 0, 20);
  packet[0] = gwAddr >> 8;
  packet[1] = gwAddr & 0x000000ff;  
  packet[2] = 'N';
  packet[3] = outputValue;
  packet[4] = '\n';
  mySerial.write(packet, 20);  
}
