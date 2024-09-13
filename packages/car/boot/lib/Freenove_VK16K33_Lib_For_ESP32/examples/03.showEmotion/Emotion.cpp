#include "Freenove_VK16K33_Lib_For_ESP32.h"
#include "Emotion.h"

//Turn your eyes clockwise
byte eyeRotate1[][8]  = {
  0x00, 0x3C, 0x4E, 0x4E, 0x7E, 0x7E, 0x3C, 0x00,
  0x00, 0x3C, 0x66, 0x66, 0x7E, 0x7E, 0x3C, 0x00,
  0x00, 0x3C, 0x72, 0x72, 0x7E, 0x7E, 0x3C, 0x00,
  0x00, 0x3C, 0x7E, 0x72, 0x72, 0x7E, 0x3C, 0x00,
  0x00, 0x3C, 0x7E, 0x7E, 0x72, 0x72, 0x3C, 0x00,
  0x00, 0x3C, 0x7E, 0x7E, 0x66, 0x66, 0x3C, 0x00,
  0x00, 0x3C, 0x7E, 0x7E, 0x4E, 0x4E, 0x3C, 0x00,
  0x00, 0x3C, 0x7E, 0x4E, 0x4E, 0x7E, 0x3C, 0x00,
};

//Turn your eyes counterclockwise
byte eyeRotate2[][8] = {
  0x00, 0x3C, 0x72, 0x72, 0x7E, 0x7E, 0x3C, 0x00,
  0x00, 0x3C, 0x66, 0x66, 0x7E, 0x7E, 0x3C, 0x00,
  0x00, 0x3C, 0x4E, 0x4E, 0x7E, 0x7E, 0x3C, 0x00,
  0x00, 0x3C, 0x7E, 0x4E, 0x4E, 0x7E, 0x3C, 0x00,
  0x00, 0x3C, 0x7E, 0x7E, 0x4E, 0x4E, 0x3C, 0x00,
  0x00, 0x3C, 0x7E, 0x7E, 0x66, 0x66, 0x3C, 0x00,
  0x00, 0x3C, 0x7E, 0x7E, 0x72, 0x72, 0x3C, 0x00,
  0x00, 0x3C, 0x7E, 0x72, 0x72, 0x7E, 0x3C, 0x00,
};

byte eyeBlink[][8] = {
  0x00, 0x00, 0x3C, 0x66, 0x42, 0x66, 0x3C, 0x00,
  0x00, 0x00, 0x3C, 0x7E, 0x42, 0x66, 0x3C, 0x00,
  0x00, 0x00, 0x3C, 0x7E, 0x7E, 0x7E, 0x3C, 0x00,
  0x00, 0x00, 0x3C, 0x7E, 0x42, 0x66, 0x3C, 0x00,
  0x00, 0x00, 0x3C, 0x7E, 0x7E, 0x7E, 0x3C, 0x00,
};

byte eyeSmile[][8] = {
  0x00, 0x00, 0x3C, 0x66, 0x42, 0x42, 0x00, 0x00,
};

byte eyeCry1[][8] = {
  0x00, 0x00, 0x00, 0x7E, 0x3C, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x7E, 0x3C, 0x18, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x7E, 0x3C, 0x00, 0x18, 0x00,
  0x00, 0x00, 0x00, 0x7E, 0x3C, 0x00, 0x00, 0x18,
  0x00, 0x00, 0x00, 0x7E, 0x3C, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x7E, 0x3C, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x7E, 0x3C, 0x00, 0x00, 0x00,
};

byte eyeCry2[][8] = {
  0x00, 0x00, 0x00, 0x7E, 0x3C, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x7E, 0x3C, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x7E, 0x3C, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x7E, 0x3C, 0x18, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x7E, 0x3C, 0x00, 0x18, 0x00,
  0x00, 0x00, 0x00, 0x7E, 0x3C, 0x00, 0x00, 0x18,
  0x00, 0x00, 0x00, 0x7E, 0x3C, 0x00, 0x00, 0x00,
};

Freenove_ESP32_VK16K33 matrix = Freenove_ESP32_VK16K33();

//rotate eyes
void eyesRotate(int delay_ms)
{
  int count = sizeof(eyeRotate1) / sizeof(eyeRotate1[0]);
  for (int i = 0; i < count; i++)
  {
    matrix.showStaticArray(eyeRotate1[i], eyeRotate2[i]);
    delay(delay_ms);
  }
}

//Blink eyes
void eyesBlink(int delay_ms)
{
  int count = sizeof(eyeBlink) / sizeof(eyeBlink[0]);
  matrix.showStaticArray(eyeBlink[0], eyeBlink[0]);
  delay(2500);
  for (int j = 0; j < 1; j++)
  {
    for (int i = 1; i < count; i++)
    {
      matrix.showStaticArray(eyeBlink[i], eyeBlink[i]);
      delay(delay_ms);
    }
  }
}

//Smile
void eyesSmile(int delay_ms)
{
  int count = sizeof(eyeSmile) / sizeof(eyeSmile[0]);
  for (int i = 0; i < count; i++)
  {
    matrix.showStaticArray(eyeSmile[i], eyeSmile[i]);
    delay(delay_ms);
  }
}

//Cry
void eyesCry(int delay_ms)
{
  int count = sizeof(eyeCry1) / sizeof(eyeCry1[0]);
  for (int i = 0; i < count; i++)
  {
    matrix.showStaticArray(eyeCry1[i], eyeCry2[i]);
    delay(delay_ms);
  }
}

//Initialize the expression module
void Emotion_Setup()
{
  matrix.init(EMOTION_ADDRESS, EMOTION_SDA, EMOTION_SCL);
}

//show emotion
void Emotion_Show(int mode)
{
  if (mode == 1)
    eyesRotate(150);
  else if (mode == 2)
    eyesBlink(100);
  else if (mode == 3)
    eyesSmile(2000);
  else if (mode == 4)
    eyesCry(200);
}
