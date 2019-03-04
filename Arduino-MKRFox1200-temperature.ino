// Code based on the Sigfox tutorial made by @disk91 
// https://www.disk91.com/2018/technology/internet-of-things-technology/introduction-to-arduino-mkrfox1200-part-1/

#include <RTCZero.h>
#include <ArduinoLowPower.h>
#include <SigFox.h>
#define LED 6         // This is the built_in led
void setup() {
   pinMode(LED,OUTPUT);
   digitalWrite(LED,LOW);
   Serial.begin(9600);
   while (!Serial);
   if ( ! SigFox.begin() ) {
     Serial.println("Error ... rebooting");
     NVIC_SystemReset();
     while(1);
   }
   SigFox.reset();
   delay(100);
   SigFox.debug();
   SigFox.end();

   // We need to have to time to program the Arduino after a reset
   // Otherwise it does not respond when in low-power mode
   Serial.println("Booting...");
   digitalWrite(LED,HIGH);
   delay(5000);
   digitalWrite(LED,LOW);
}

typedef struct __attribute__ ((packed)) sigfox_message {
int8_t temp;
} SigfoxMessage;

void loop() {
   // put your main code here, to run repeatedly:
   SigFox.begin();

   SigFox.status();
   SigfoxMessage msg;
   msg.temp = (int8_t)SigFox.internalTemperature();
   
   Serial.println("TEMPERATURE = ");
   Serial.println(msg.temp);

   SigFox.beginPacket();
   SigFox.write((uint8_t*)&msg,sizeof(msg));
   SigFox.endPacket(false);
   SigFox.end();

   // Wait for 10 minutes.
   // Low Power version - be carefull of bug
   //   LowPower.sleep(10*60*1000);
   // Normal version
   delay(10*60*1000);
}
