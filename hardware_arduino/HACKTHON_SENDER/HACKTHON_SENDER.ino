#include<Wire.h>
#define SLAVE_ADDR 9
#define ANSWERSIZE 5
String answer="hello";

void setup() {
  Wire.begin(SLAVE_ADDR);

  Wire.onRequest(requestEvent);

  Wire.onReceive(recieveEvent);

  Serial.begin(9600);

  Serial.println("slave demonstration");
}  
void recieveEvent(){
  while(0<Wire.available()){
    byte x =Wire.read();
  }
  Serial.println("recieve Event");
}

void requestEvent(){
  byte response[ANSWERSIZE];
  for (byte i=0;i<ANSWERSIZE;i++){
    response[i]=(byte)answer.charAt(i);
  }
  Wire.write(response,sizeof(response));

  Serial.println("Request Event");

}

void loop() {
  delay(50);
}
