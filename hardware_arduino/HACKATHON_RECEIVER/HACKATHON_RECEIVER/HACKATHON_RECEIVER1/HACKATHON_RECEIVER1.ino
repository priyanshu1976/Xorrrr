#include<Wire.h>

#define MOTOR_PWM1 11
#define MOTOR_PWM2 11   // PWM pin for speed control
#define MOTOR_DIR1 7   // Direction pin 1
#define MOTOR_DIR2 6 
#define MOTOR_DIR3 5  // Direction pin 2
#define MOTOR_DIR4 4
#define SLAVE_ADDR 9

int speed=5,motor_read;

void setup() {
    Wire.begin(SLAVE_ADDR);
    Wire.onReceive(recieve);

    pinMode(MOTOR_PWM1, OUTPUT);
    pinMode(MOTOR_DIR1, OUTPUT);
    pinMode(MOTOR_DIR2, OUTPUT);
    pinMode(MOTOR_PWM2, OUTPUT);
    pinMode(MOTOR_DIR3, OUTPUT);
    pinMode(MOTOR_DIR4, OUTPUT);

    Serial.begin(9600);
}

void recieve(int bytes){
  if (Wire.available()){
    motor_read=Wire.read();
  }
  if(motor_read == 1){
    digitalWrite(MOTOR_DIR1, HIGH);
    digitalWrite(MOTOR_DIR2, LOW);
    analogWrite(MOTOR_PWM1, speed);
    digitalWrite(MOTOR_DIR3, HIGH);
    digitalWrite(MOTOR_DIR4, LOW);
    analogWrite(MOTOR_PWM2, speed); // Speed (0-255)
    Serial.println("RADD is runinng");
    delay(2000);
  }
  else{
    Serial.println("RADD is not running");
  }
}

void loop(){

}

