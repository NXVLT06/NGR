export interface JourneyMilestone {
  year: string;
  stage: string;
  title: string;
  focus: string;
  description: string;
  deliverables: string[];
  badge: string;
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    year: "PHASE 01",
    stage: "FOUNDATIONS",
    title: "Discrete Electronics & Circuit Synthesis",
    focus: "Analog / Digital Circuitry & Semiconductor Physics",
    description: "Deep-dive into foundational electrical engineering, operational amplifier topologies, transistor saturation switching, timing generators (NE555), and digital logic decade dividers (CD4017).",
    deliverables: ["Analog Filter Synthesizers", "Discrete Traffic Controllers", "Power Regulation Circuits", "Transistor Logic Gates"],
    badge: "Hardware Logic"
  },
  {
    year: "PHASE 02",
    stage: "EMBEDDED SYSTEMS",
    title: "Microcontroller Architectures & Embedded C/C++",
    focus: "Low-Level Registers, Timers & Hardware Interrupts",
    description: "Transitioned to register-level programming and interrupt service routines on AVR (ATmega328P/32U4) and ARM architectures. Mastered SPI, I2C, and UART bus communication protocols.",
    deliverables: ["Rocket Staging Sequencers", "USB HID Gaming Peripherals", "EEPROM Security Keypads", "Quadrature Encoders"],
    badge: "Firmware Core"
  },
  {
    year: "PHASE 03",
    stage: "EDGE & IOT",
    title: "Connected Hardware & Wireless Telemetry Nodes",
    focus: "ESP32, LoRa Sub-GHz, Cellular Networks & RTOS",
    description: "Architected multi-threaded real-time firmware using FreeRTOS. Developed long-range sub-GHz LoRa telemetry for CanSat avionics, cellular GSM/GPS emergency nodes, and cloud telemetry pipelines.",
    deliverables: ["ElderGuard Wearable v25.0", "CanSat PocketQube OBC", "Remote Biometric Telemetry", "RFID Parking Access"],
    badge: "Connected Edge"
  },
  {
    year: "PHASE 04",
    stage: "AI & SIGNAL PROCESSING",
    title: "Intelligent Systems & Computational DSP",
    focus: "Vectorized Signal Analytics, FFT & Machine Learning",
    description: "Merged hardware with intelligence. Formulated derivative rate-of-change (dI/dt) signal filtering, wavelet transforms, Extreme Learning Machines (ELM), and automated classification models.",
    deliverables: ["Adaptive Optical Safety Model", "EEG Bio-Signal Decoders", "Predictive Vibration ML", "Real-Time DSP Engines"],
    badge: "Intelligent Edge"
  },
  {
    year: "PHASE 05",
    stage: "RESEARCH & ADVANCED LAB",
    title: "Autonomous Systems & Mission-Critical Prototyping",
    focus: "End-to-End System Prototyping & Technical Research",
    description: "Synthesizing electronics, firmware, mathematical models, and edge intelligence to design robust, deterministic prototypes engineered from first principles.",
    deliverables: ["Hardware-in-the-Loop Test Benches", "STAR Summit Research Models", "Avionics Payloads", "Smart Infrastructure"],
    badge: "Research & Systems"
  },
  {
    year: "2026",
    stage: "CISCO CERTIFIED",
    title: "Cisco Networking Academy — Networking Basics",
    focus: "Verified Course Certificate, Digital Badge & 5 Module Achievements",
    description: "Earned official Cisco Networking Academy verified credentials in 'Networking Basics' (Course Certificate & Badge issued Feb 02, 2026) along with 5 individual module achievements covering network fundamentals, IPv4/IPv6 architectures, communications, protocols, and access layers.",
    deliverables: [
      "Cisco Verified Course Badge: Networking Basics",
      "Cisco Course Certificate: Networking Basics (Feb 02, 2026)",
      "Module Achievement: Network Basics (Jan 19, 2026)",
      "Module Achievement: Internet Protocol Basics (Jan 19, 2026)",
      "Module Achievement: Network Communications Basics (Jan 19, 2026)",
      "Module Achievement: Networking Protocols Basics (Jan 18, 2026)",
      "Module Achievement: Network Access Basics (Jan 18, 2026)"
    ],
    badge: "Cisco Verified"
  }
];
