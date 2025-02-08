#include<Wire.h>

#define SLAVE_ADDR 9

// MOTOR OUTPUT PINS
int motor_pin1 = 9;  // IN1
int motor_pin2 = 8;  // IN2
int motor_pin3 = 7;  // IN3
int motor_pin4 = 6;  // IN4

int recieve;

void  setup() {
  Wire.begin();
  Serial.begin(9600);
  pinMode(motor_pin1,OUTPUT);
  pinMode(motor_pin2,OUT[UT])
}

void loop() {
 Wire.beginTransmission(SLAVE_ADDR);
 Wire.write(0);
 Wire.endTransmission();

 Serial.println();
 Wire.requestFrom(SLAVE_ADDR,ANSWERSIZE);
 String response = " ";

 while (Wire.available()){
  char b = Wire.read();
  response += b ;
 }

  Serial.println(response);

}
