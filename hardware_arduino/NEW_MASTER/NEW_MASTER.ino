#include <Wire.h>
#include <SPI.h>
#include <LoRa.h>
#include <SoftwareSerial.h>

#define SLAVE_ADDR 9

#define TRIG_PIN1 5
#define ECHO_PIN1 6//ultrasonic 1
#define TRIG_PIN2 3
#define ECHO_PIN2 4//ultrasonic 2
#define INFRARED 7//infrared
#define FLAME A0//flame
#define WATER 10//water
#define TILT 8//tilt

#define SS 1  // LoRa NSS
#define RST 9   // LoRa Reset
#define DIO0 2  // LoRa DIO0

// VARIABLES
int motor_state = 1;//intial is 1
long time1, time2;
float distance1, distance2, water_read, flame_read, tilt_read;
//SoftwareSerial gpsSerial(RXPin, TXPin);

void setup() {
    Wire.begin();
    Serial.begin(9600);
    Serial.println("Master Ready.");

    pinMode(TRIG_PIN1, OUTPUT);
    pinMode(ECHO_PIN1, INPUT);
    pinMode(TRIG_PIN2, OUTPUT);
    pinMode(ECHO_PIN2, INPUT);
    pinMode(INFRARED, INPUT);
    pinMode(WATER, INPUT);
    pinMode(TILT, INPUT);
    pinMode(FLAME,INPUT);

       // Initialize LoRa
    LoRa.setPins(SS, RST, DIO0);
    if (!LoRa.begin(433E6)) {
        Serial.println("LoRa initialization failed!");
        while (1);
    }
    Serial.println("LoRa Initialized.");
}

void loop() {
    Wire.beginTransmission(SLAVE_ADDR);
    Wire.write(motor_state);
    Wire.endTransmission();
    // INFRARED

    //  if ((digitalRead(INFRARED) == 0 )){
    //   Serial.println("RADD is not running");
    //   //  unsigned long int currmillis=millis();
    //   //  unsigned long int newmillis=0;
    //   // if(currmillis-newmillis==5000){
    //   //   newmillis=currmillis;
    //   // }
    //   motor_state = 0;
    // }
    // else{
    //   motor_state = 1;
    // }

      
    //   //FLAME
    flame_read = analogRead(FLAME);
    // if (flame_read <= 50) {
    //     Serial.println("Flames detected!");
    //     Serial.println("RADD is not running");
    //     motor_state=0;
        
    // }
    // else{
    //   motor_state = 1;
    // }

        // ULTRASONIC SENSOR
    digitalWrite(TRIG_PIN1, LOW);
    delayMicroseconds(2);
    digitalWrite(TRIG_PIN1, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIG_PIN1, LOW);
    
    digitalWrite(TRIG_PIN2, LOW);
    delayMicroseconds(2);
    digitalWrite(TRIG_PIN2, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIG_PIN2, LOW);

    time1 = pulseIn(ECHO_PIN1, HIGH);
    time2 = pulseIn(ECHO_PIN2, HIGH);

    distance1 = (time1 * 0.0344) / 2;
    distance2 = (time2 * 0.0344) / 2;

    Serial.println((distance1 >= 4 || distance2 >= 4));
    Serial.println((flame_read <= 50));
    Serial.println((digitalRead(INFRARED) == 0));
    Serial.println((distance1 >= 4 || distance2 >= 4) || (flame_read <= 50) || (digitalRead(INFRARED) == 0));

    // SAFETY CHECKS
    if ((distance1 >= 4 || distance2 >= 4) || (flame_read <= 50) || (digitalRead(INFRARED) == 0) ){
      motor_state = 0;
      Serial.println("RADD is not running");
    }
    else{
       motor_state = 1;
       Serial.println("RADD is runinng");
    }

    Serial.print("Sent Motor State: ");
    Serial.println(motor_state);
    // Serial.print("infra value");
    // Serial.println(digitalRead(INFRARED));
    Serial.println(distance1);
    Serial.println(distance2);

      LoRa.beginPacket();
    LoRa.print("Motor: "); LoRa.print(motor_state);
    if(motor_state ==0){
      LoRa.print("RADD IS NOT RUNNING");
    }
    else{
      LoRa.print("RADD IS RUNNING");
    }
    LoRa.print(", Flame: "); LoRa.print(flame_read);
    LoRa.print(", IR: "); LoRa.print(INFRARED);
    LoRa.print(", Water: "); LoRa.print(water_read);
    LoRa.print(", Tilt: "); LoRa.print(tilt_read);
    LoRa.print(", Distance1: "); LoRa.print(distance1);
    LoRa.print(", Distance2: "); LoRa.print(distance2);
    LoRa.endPacket();

    // Serial.println(flame_read);
    delay(20); // Delay to prevent flooding I2C
}
