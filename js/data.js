window.PORTFOLIO = {

  /* ── Identity ── */
  identity: {
    name: 'Janith Bandara',
    initials: 'JC',
    // Leave imageUrl empty ('') to show the initials placeholder.
    // Drop in a path or URL (e.g. 'assets/me.jpg') to show a photo.
    imageUrl: '',
    tagline: 'Embedded systems & firmware engineer — bridging hardware, firmware, and manufacturing, with a background in building and industrial automation.',
    location: 'Colombo, Sri Lanka',
    available: true,
    // roles the typewriter cycles through
    roles: [
      'EMBEDDED SYSTEMS ENGINEER',
      'FIRMWARE & HARDWARE SECURITY',
      'MANUFACTURING AUTOMATION',
      'BUILDING & INDUSTRIAL AUTOMATION',
    ],
  },

  /* ── Headline stats ── */
  stats: [
    { num: '3',    label: 'Engineering Domains' },
    { num: '300+', label: 'Units Flashed in Production' },
    { num: '15+',  label: 'Technologies & Platforms' },
    { num: '5+',   label: 'Industry Projects' },
  ],

  /* ── About paragraphs ── */
  about: [
    "Hi, I'm <strong>Janith Bandara</strong> — an embedded systems engineer who works across the full product stack, from low-level firmware and hardware security through to manufacturing automation and production bring-up.",
    "My current work centres on firmware for connected IoT devices: ESP32 / ESP-AT with TLS-secured communication, BLE provisioning and OTA, and hardware-backed security using ATECC608C cryptographic ICs (ECC key lifecycle and ECDSA signing/verification). I also build the manufacturing side of that story — automated SD-card and eMMC flashing stations, production jig supervisors, and SBC/Linux systems on Orange Pi 5 Pro and Raspberry Pi Compute Module 4 (custom Armbian images, systemd, Nginx, Docker, WireGuard).",
    "Before embedded systems I worked in building automation — BMS and HVAC controls with Delta Controls, Modbus/BACnet integration, and PID tuning and commissioning — and in industrial automation, with PLC programming on Rockwell and Siemens, HMI/SCADA, and VFD and motor-control work. That controls background shapes how I approach reliable, real-world hardware.",
  ],

  hobbies: [
    { icon: '💻', label: 'Hardware hacking' },
    { icon: '🛠️', label: 'PCB design' },
    { icon: '🤖', label: 'Robotics tinkering' },
    { icon: '🔧', label: 'Soldering & prototyping' },
    { icon: '🚵', label: 'Motorcycle Riding & Hiking' },
  ],

  /* ── Skills (grouped by category tab) ── */
  skills: {
    embedded: {
      title: 'Embedded Firmware',
      desc: 'Firmware for connected IoT devices — from bare-metal drivers to BLE provisioning and OTA.',
      items: [
        { name: 'Embedded C', level: 'Advanced', pct: 85 },
        { name: 'C++', level: 'Advanced', pct: 80 },
        { name: 'ESP32 / ESP32-C6 (ESP-AT)', level: 'Advanced', pct: 85 },
        { name: 'Nordic nRF', level: 'Intermediate', pct: 70 },
        { name: 'Arduino', level: 'Advanced', pct: 80 },
        { name: 'BLE (provisioning / OTA)', level: 'Advanced', pct: 80 },
        { name: 'FreeRTOS / bare-metal', level: 'Intermediate', pct: 70 },
        { name: 'I2C / SPI / UART', level: 'Advanced', pct: 80 },
        { name: 'Peripheral & LED drivers', level: 'Advanced', pct: 80 },
      ],
    },
    hwsec: {
      title: 'Hardware Security & Communication',
      desc: 'Hardware-backed security and secure device communication.',
      items: [
        { name: 'ATECC608C (ECC)', level: 'Advanced', pct: 80 },
        { name: 'ECDSA signing / verification', level: 'Advanced', pct: 80 },
        { name: 'TLS / mutual TLS', level: 'Advanced', pct: 80 },
        { name: 'Secure key provisioning', level: 'Intermediate', pct: 70 },
        { name: 'Certificate management', level: 'Intermediate', pct: 70 },
        { name: 'Python (crypto verification)', level: 'Advanced', pct: 80 },
      ],
    },
    manufacturing: {
      title: 'Manufacturing Automation',
      desc: 'Automating device provisioning and validation on the production floor.',
      items: [
        { name: 'SD-card flashing systems', level: 'Advanced', pct: 85 },
        { name: 'eMMC flashing', level: 'Advanced', pct: 80 },
        { name: 'Production jig supervision', level: 'Advanced', pct: 80 },
        { name: 'Batch production & V&V', level: 'Advanced', pct: 85 },
        { name: 'Image-quality checks', level: 'Intermediate', pct: 70 },
        { name: 'Work instructions & docs', level: 'Advanced', pct: 85 },
      ],
    },
    sbc: {
      title: 'SBC & Linux / DevOps',
      desc: 'Single-board-computer bring-up, custom Linux images, and deployment automation.',
      items: [
        { name: 'Orange Pi 5 Pro', level: 'Advanced', pct: 80 },
        { name: 'Raspberry Pi / CM4', level: 'Advanced', pct: 80 },
        { name: 'Custom Armbian builds', level: 'Intermediate', pct: 70 },
        { name: 'systemd / Nginx', level: 'Advanced', pct: 80 },
        { name: 'Docker Compose', level: 'Intermediate', pct: 70 },
        { name: 'WireGuard VPN', level: 'Intermediate', pct: 70 },
        { name: 'RTSP / IP camera', level: 'Intermediate', pct: 65 },
      ],
    },
    bms: {
      title: 'Building Automation (BMS)',
      desc: 'HVAC controls, commissioning, and integration for building-management systems.',
      items: [
        { name: 'Delta enteliWEB / ORCAview', level: 'Advanced', pct: 80 },
        { name: 'enteliVAULT', level: 'Intermediate', pct: 70 },
        { name: 'AHU / FCU / VAV control', level: 'Advanced', pct: 80 },
        { name: 'Chillers / CHW / VSD', level: 'Advanced', pct: 75 },
        { name: 'PID tuning & commissioning', level: 'Advanced', pct: 80 },
        { name: 'Modbus / BACnet / M-Bus / MS-TP', level: 'Advanced', pct: 80 },
        { name: 'Energy metering & power analysers', level: 'Advanced', pct: 75 },
      ],
    },
    industrial: {
      title: 'Industrial Automation',
      desc: 'PLC, HMI, SCADA, and motor-control work in industrial plant environments.',
      items: [
        { name: 'PLC — Rockwell (Allen-Bradley)', level: 'Intermediate', pct: 70 },
        { name: 'PLC — Siemens', level: 'Intermediate', pct: 70 },
        { name: 'HMI configuration', level: 'Intermediate', pct: 70 },
        { name: 'SCADA (WinCC, Ignition)', level: 'Intermediate', pct: 65 },
        { name: 'VFD / motor control', level: 'Intermediate', pct: 70 },
        { name: 'Robotics maintenance', level: 'Intermediate', pct: 60 },
      ],
    },
  },

  /* tab order + display labels */
  skillTabs: [
    { key: 'embedded',      label: 'Embedded Firmware' },
    { key: 'hwsec',         label: 'Hardware Security' },
    { key: 'manufacturing', label: 'Manufacturing' },
    { key: 'sbc',           label: 'SBC & Linux' },
    { key: 'bms',           label: 'Building Automation' },
    { key: 'industrial',    label: 'Industrial Automation' },
  ],

  /* ── Projects ── */
  projects: [
    {
      icon: '📟',
      title: 'Secure Wireless Utility Meter',
      desc: 'Embedded firmware for a battery-powered wireless utility-metering device. Hardware-backed security via an ATECC608C crypto IC (ECC key lifecycle, ECDSA signing, Python-side verification), TLS-secured ESP32-C6 uplink/downlink, non-blocking LED status drivers, and full power-consumption and battery-life characterization.',
      tags: ['Embedded C', 'ESP32-C6', 'ATECC608C', 'TLS'],
      github: '',
      demo: '',
    },
    {
      icon: '🏭',
      title: 'SBC Manufacturing Flashing Station',
      desc: 'An automated manufacturing station that provisions single-board computers: an SD-card / eMMC flashing system with an Nginx-based operator UI, a jig supervisor for per-unit customization, and automated camera image-quality checks — validated across production batches of 300+ units.',
      tags: ['Linux', 'Orange Pi 5 Pro', 'Nginx', 'Automation'],
      github: '',
      demo: '',
    },
    {
      icon: '⚙️',
      title: 'Service-Stack Provisioning Automation',
      desc: 'A single-script device-provisioning pipeline that automates registration, WireGuard VPN, Docker Compose deployment, and binary updates, with secure key transfer — aligning two manufacturing stations to a new service stack and validated end-to-end.',
      tags: ['Bash', 'Docker', 'WireGuard', 'DevOps'],
      github: '',
      demo: '',
    },
    {
      icon: '🧩',
      title: 'Compute Module 4 Hardware Bring-Up',
      desc: 'Bring-up of a monitoring PCB and peripherals on a Raspberry Pi Compute Module 4 — validating USB-audio and RTSP IP-camera connectivity, preparing the camera-firmware flashing environment, and documenting wiring, diagnostics, and recovery procedures.',
      tags: ['CM4', 'Linux', 'RTSP', 'Bring-Up'],
      github: '',
      demo: '',
    },
    {
      icon: '🏢',
      title: 'BMS Energy & HVAC Integration',
      desc: 'Building-management work across commercial and industrial sites: AHU/FCU/VAV control programs and graphics in Delta Controls, PID and VSD tuning and commissioning, Modbus/BACnet integration of energy meters and power analysers, and database-level corrections to restore accurate energy reporting.',
      tags: ['Delta Controls', 'BACnet', 'Modbus', 'PID'],
      github: '',
      demo: '',
    },
    {
      icon: '🦾',
      title: 'Industrial Automation & Controls',
      desc: 'Hands-on industrial automation: PLC programming on Rockwell (Allen-Bradley) and Siemens, HMI configuration and communication, SCADA with WinCC and Ignition, and VFD / motor-control work, alongside robotics maintenance and process-improvement projects.',
      tags: ['PLC', 'SCADA', 'HMI', 'VFD'],
      github: '',
      demo: '',
    },
  ],

  /* ── Credly Badges / Certifications ──
     Uses Credly's OFFICIAL embed. For each badge, open it on your
     Credly profile → Share → Embed badge, and copy the
     `data-share-badge-id` value into `badgeId` below. */
  badges: [
    {   badgeId: 'e0ddef84-0373-4854-b011-24af154beccc',    },
    {   badgeId: 'ea7bcdfd-9fa9-4d44-87b1-e8fc99ec8b91',    },
    {   badgeId: 'd78b6095-d133-42c7-a961-8f042baf6834',    },
    {   badgeId: 'd55f4a6b-41a8-48b4-b240-a339668919e7',    },
    {   badgeId: '9544af11-0e39-4b4a-ac6d-e0161d81b77a',    },
    {   badgeId: '7725f732-c3a8-4a58-b3a6-8b506c2256f2',    },
    // Add more badges — just the badgeId for each:
    // { badgeId: 'another-badge-id' },
  ],
  // Link to the full Credly profile (shown as a "View all" button)
  credlyProfile: 'https://www.credly.com/users/janith-kehelwatta',

  /* ── Contact ── */
  contact: {
    email: 'janith.cv@proton.me',
    phone: '+94 72 871 0636',
    location: 'Colombo, Sri Lanka',
    socials: [
      { name: 'GitHub',   handle: 'github.com/janithcbk123',   url: 'https://github.com/janithcbk123',       icon: 'github' },
      { name: 'LinkedIn', handle: 'linkedin.com/in/janith-c',  url: 'https://www.linkedin.com/in/janith-c/', icon: 'linkedin' },
    ],
  },
};

/* SVG icon paths reused across the app */
const ICONS = {
  github: '<path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.38.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .26.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>',
  email: '<rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M2 8l10 6 10-6" fill="none" stroke="currentColor" stroke-width="2"/>',
};
