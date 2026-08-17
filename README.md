# Gokulraj Natarajan — Intelligent Hardware & Embedded Systems Portfolio

A state-of-the-art engineering portfolio and interactive hardware archive for **Gokulraj Natarajan**, specializing in **Embedded Systems, Edge IoT, Space Avionics & Telemetry, Signal Processing, and Intelligent Hardware Prototyping**.

🔗 **Live Repository**: [https://github.com/NXVLT06/NGR.git](https://github.com/NXVLT06/NGR.git)  
🎓 **Institution & Academic Standing**: Saveetha Institute of Medical and Technical Sciences (SIMATS Engineering) — **CGPA: 8.38**  
🏆 **Recognition**: Award of Excellence — Best Capstone Project Award (1st Place, 2025)

---

## 🌟 Key Highlights & System Architecture

- **High-Performance Architecture**: Zero-build runtime leveraging React 18, GSAP animations, Tailwind CSS, Lucide icons, and custom audio telemetry synthesis.
- **Interactive Project Modal & Media Showcase**: Real hardware demonstration videos, multi-photo hardware galleries, circuit schematics, telemetry logs, and BOM breakdowns.
- **11 Core Engineering Systems**:
  1. **Project 01 — DIY USB Sim Racing Controller** (ATmega32U4, 2400 CPR Optical Encoder, Contactless Hall-Effect Pedals, 6+R Gated Shifter Matrix, 1000Hz HID).
  2. **Project 02 — Microcontroller-Based Rocket Stage & Launch Simulator** (ATmega328P, Deterministic FSM, Dual-Stage Isolated Relay Actuation, PWM Turbine Spooling, DFPlayer Audio Sync).
  3. **Project 03 — IoT Smart Parking Management Infrastructure** [🏆 *Best Capstone Project Award*] (13.56 MHz RFID Access Gate, Multiplexed IR & Ultrasonic Bay Occupancy Arrays, Servo Actuation, Real-time Local LCD & Cloud Telemetry).
  4. **Project 04 — IoT Enabled Automated Precision Dosing System** (ESP32 / Arduino MCU, PWM MOSFET Power Switching, Non-Contact Liquid Level Telemetry, Closed-Loop Flow Feedback, Blynk IoT Cloud).
  5. **Project 05 — ElderGuard v26.0 (ESP32 Fall Detection & Emergency Tracker)** (Standalone Edge IoT Wearable, MPU-6050 6-Axis Kinematic Vector DSP, SIM800L GSM Cellular Modem, Neo-6M GPS Engine with Direct Google Maps SMS Alert Link Dispatch & Voice Dialing).
  6. **Project 06 — Sub-Orbital Satellite & Ground Base Station Telemetry System** (Two-Node Space Avionics: Airborne On-Board Computer with FreeRTOS sensor fusion of BMP280 Altitude, MPU-6050 IMU, VL53L0X Laser ToF + SX1278 433MHz LoRa Downlink to a Ground Base Station Receiver with Dual-Monitor Telemetry Logging Console).
  7. **Project 07 — Smart Digital Lock System for Secure Access Control** (ATmega328P, EEPROM Cryptographic Token Verification, Row-Column Keypad Matrix, Opto-Isolated 12V Solenoid Driver with 1N4007 Flyback Suppression).
  8. **Project 08 — Automated Headlight Dipper (Anti-Glare Adaptive Beam)** (Optical Collimator Sensor Tube, LM358 Precision Schmitt Trigger with Hysteresis, 30A Automotive Switching Relays, Flash Blindness Elimination).
  9. **Project 09 — Discrete Traffic Light Control System** (Non-Programmable Hardware Logic, NE555 Astable Multivibrator Clock, CD4017 CMOS Decade Counter, Diode OR Matrix & BC547 Transistor Stages).
  10. **Project 10 — Remote Biometric Telemetry Node** (ESP8266 NodeMCU, MAX30102 Photoplethysmography Pulse Oximeter, AC/DC Peak Detection DSP, SSD1306 Waveform OLED, Blynk Cloud Alert Webhooks).
  11. **Project 11 — IoT-Based Smart Classroom Monitoring System** (ESP32 Microcontroller, Sequenced Dual-IR Beam Entry/Exit Visitor Counter, LDR Ambient Light Sensing, 5V Opto-Isolated Relays for Lighting & 12V Fan Actuation, Mobile IIoT Dashboard Control).

- **Academic & Industry Milestones**: Career timeline covering embedded prototypes, Best Capstone Project Award, Cisco Networking Academy certification (Verified Badge, Course Certificate & 5 Module Achievements), NPTEL IoT, and hardware deployments.

---

## 🛠️ Technology Stack & Toolchain

- **Firmware & Microcontrollers**: Embedded C/C++, FreeRTOS, ESP32 (Xtensa Dual-Core), ATmega328P, ATmega32U4, ESP8266 NodeMCU, NE555 / CD4017.
- **Protocols & Buses**: LoRa Physical Layer (SX1278 433MHz), GSM / GPRS (AT Commands), NMEA 0183 GPS, SPI, I2C, UART, USB HID (1000Hz), Wi-Fi TCP/IP, Blynk IoT.
- **Sensors & Actuators**: MPU-6050 (6-DOF IMU), BMP280 (Barometer/Altimeter), VL53L0X (ToF Laser), MAX30102 (PPG Biometrics), RC522 (13.56MHz RFID), TCRT5000 (Infrared), Hall-Effect Transducers, Optical Rotary Encoders, SG90 Servos, High-Current Relays, Solenoids.
- **Frontend & Web Stack**: HTML5, Vanilla JavaScript (ES6+), React 18, Tailwind CSS, Lucide Icons, GSAP 3 + ScrollTrigger, Web Audio API.

---

## 🚀 Running Locally

Open `index.html` directly in any modern browser, or launch a lightweight HTTP server:

```bash
# Using Python
python -m http.server 3000

# Using Node.js
npx serve .
```

Visit: `http://localhost:3000`

---

## 📁 Repository Structure

```
gokul-portfolio/
├── index.html                 # Main entrypoint with CDN loaders & metadata
├── style.css                  # Custom styling, dark/light theme tokens & animations
├── data.js                    # Complete project dataset, hardware specs & research data
├── app.js                     # React 18 portfolio application & modal engine
├── assets/
│   ├── images/
│   │   ├── satellite/         # Project 06 Satellite & Base Station Telemetry photos
│   │   │   ├── sat_telemetry_terminal.jpeg   # Dual-monitor ground station receiver
│   │   │   ├── sat_base_station.jpeg          # LoRa transceiver node & antenna
│   │   │   └── sat_sensor_rig.jpeg            # Satellite avionics & sensor wiring
│   │   ├── elderguard_sms_alert.jpeg          # Project 05 Real GPS SMS alert proof
│   │   ├── best_capstone_certificate.png      # SIMATS Capstone Award 2025
│   │   └── shapes/            # Graphics & portraits
│   ├── videos/
│   │   ├── 1.MP4              # Sim Racing Controller Demo
│   │   ├── 2.MP4              # Rocket Stage Simulator Demo
│   │   ├── 3.MOV              # IoT Smart Parking Access Gate Demo
│   │   ├── 4.MP4              # Precision Dosing System Demo
│   │   ├── 5.mp4              # ElderGuard Fall Detection Demo
│   │   ├── 8.MOV              # Automated Headlight Dipper Demo
│   │   └── hero-video.mp4     # Hero Header Ambient Background Video
│   └── Gokulraj_Natarajan_Resume.pdf  # Downloadable PDF Resume
└── README.md                  # Complete technical documentation
```

---

## 👨‍💻 Author

**Gokulraj Natarajan**  
Electronics & Embedded Systems Engineer  
Saveetha Institute of Medical and Technical Sciences (SIMATS Engineering)  
Portfolio & Project Repository: [https://github.com/NXVLT06/NGR.git](https://github.com/NXVLT06/NGR.git)
