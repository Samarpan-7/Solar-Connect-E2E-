import { useState, useRef, useEffect } from 'react';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('en');
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'te' ? 'te-IN' : 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [language]);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'te' : 'en';
    setLanguage(newLang);
    if (recognitionRef.current) {
      recognitionRef.current.lang = newLang === 'te' ? 'te-IN' : 'en-US';
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const getSmartResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    // English responses
    if (language === 'en') {
      // Short affirmative responses
      if (input === 'yes' || input === 'yeah' || input === 'yep' || input === 'sure' || input === 'ok' || input === 'okay') {
        return "Excellent! I'm here to help you understand solar energy benefits. What aspect interests you most - savings, environmental impact, or system installation?";
      }
      
      // Short negative responses
      if (input === 'no' || input === 'nope' || input === 'nah') {
        return "No problem! Feel free to ask me anything about solar panels, costs, savings, or installation. I'm here to provide information whenever you're ready.";
      }
      
      // Convince me
      if (input.includes('convince me') || input.includes('convince') || input === 'convince me') {
        return "Let me share some compelling facts: A typical 5kW solar system saves ₹60,000-90,000 annually on electricity bills. With 25-year warranty panels, that's ₹15-22 lakhs in total savings! Add 30% government subsidies, increasing property values, and zero pollution - solar pays for itself in 4-5 years while protecting our planet. Plus, you'll never worry about electricity rate hikes again!";
      }
      
      // Maybe responses
      if (input.includes('maybe') || input.includes('not sure') || input.includes('thinking')) {
        return "I understand! Solar is a big decision. Let me help clarify: What's your main concern - upfront costs, maintenance, or effectiveness? I can provide specific data to address your questions.";
      }
      
      // Greetings
      if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input === 'hi' || input === 'hello') {
        return "Hello! 👋 I'm your solar energy advisor. Whether you're curious about solar savings, installation process, or environmental benefits, I'm here to help! What would you like to know?";
      }
      
      // Cost and savings
      if (input.includes('cost') || input.includes('price') || input.includes('expensive') || input.includes('afford')) {
        return "Solar panel costs have dropped 85% in the past decade! A 3kW system costs ₹1.5-2 lakhs (after 30% subsidy). With ₹3,000-5,000 monthly savings, you recover costs in 4-5 years. After that, it's pure profit for 20+ years! Many banks offer solar loans at 7-9% interest. Would you like a detailed cost breakdown for your home?";
      }
      
      if (input.includes('save') || input.includes('saving') || input.includes('bill')) {
        return "Solar can reduce your electricity bill by 80-100%! A typical household using 300 units/month (₹3,000+ bill) can save ₹36,000-40,000 yearly. Over 25 years, that's ₹9-10 lakhs in savings! The system pays for itself in 4-5 years, then generates free electricity for decades. Want me to estimate your specific savings?";
      }
      
      // Installation and maintenance
      if (input.includes('install') || input.includes('installation') || input.includes('setup')) {
        return "Installation is surprisingly simple! It takes just 2-3 days for a residential system. Process: 1) Site survey (free), 2) Design & approval (1 week), 3) Installation (2-3 days), 4) Inspection & grid connection (1 week). Our certified electricians handle everything including permits and paperwork. Minimal disruption to your daily routine!";
      }
      
      if (input.includes('maintain') || input.includes('maintenance') || input.includes('repair')) {
        return "Solar panels need very little maintenance! Just clean them every 2-3 months (costs ₹200-500) or let rain do it naturally. No moving parts means minimal wear. Panels come with 25-year warranties, inverters 5-10 years. Annual maintenance cost: ₹2,000-3,000 maximum. Most systems run trouble-free for decades!";
      }
      
      // Efficiency and performance
      if (input.includes('efficient') || input.includes('work') || input.includes('generate') || input.includes('power') || input.includes('electricity')) {
        return "Modern solar panels are 20-22% efficient, generating 4-5 kWh per day per kW installed (in good sunlight). Even on cloudy days, they produce 10-25% output. A 5kW system generates 20-25 units daily - enough for most homes! Net metering lets you bank excess power. During monsoon, your banked credits cover shortfalls. Solar works reliably 300+ days/year in India!";
      }
      
      // Subsidies and incentives
      if (input.includes('subsidy') || input.includes('government') || input.includes('scheme') || input.includes('incentive')) {
        return "Great news! Government subsidies make solar very affordable: 30% subsidy (up to ₹78,000) for systems up to 10kW. Process is simple - we handle all paperwork. Additional benefits: 40% accelerated depreciation for businesses, tax benefits, priority grid connection. Many states offer extra incentives. These subsidies reduce your payback period significantly!";
      }
      
      // Environmental benefits
      if (input.includes('environment') || input.includes('pollution') || input.includes('climate') || input.includes('green') || input.includes('carbon')) {
        return "Solar is a climate game-changer! A 5kW system prevents 7-8 tons of CO2 emissions annually - equivalent to planting 150 trees or taking 2 cars off the road! Over 25 years, you'll offset 175+ tons of carbon. Coal power pollutes air and water; solar is 100% clean. By going solar, you're protecting health, preserving resources, and fighting climate change. Be part of the solution!";
      }
      
      // Space and roof requirements
      if (input.includes('space') || input.includes('roof') || input.includes('area') || input.includes('size')) {
        return "You need about 100 sq ft per kW. A typical 3kW system needs 300 sq ft - roughly a small bedroom's size. Most residential roofs easily accommodate 3-5kW systems. Panels can go on flat or sloped roofs, ground mounts, even carports! We optimize layout for your specific roof. Orientation and shading matter more than total space. Want a free roof assessment?";
      }
      
      // Weather concerns
      if (input.includes('rain') || input.includes('monsoon') || input.includes('cloudy') || input.includes('weather') || input.includes('winter')) {
        return "Solar works year-round! Yes, output drops 70-90% during heavy clouds, but net metering solves this - excess summer production credits offset monsoon shortfalls. Annual generation remains consistent. Rain actually helps by cleaning panels naturally! Panels are waterproof, hail-resistant, and tested for extreme weather. India's 300+ sunny days yearly make solar highly viable everywhere!";
      }
      
      // Durability and warranty
      if (input.includes('durable') || input.includes('warranty') || input.includes('lifespan') || input.includes('last')) {
        return "Solar panels are built to last! Standard warranties: 25 years performance (80% output guaranteed), 10-12 years product defects. Actual lifespan: 30-35 years! Panels withstand hail, storms, extreme temperatures (-40°C to +85°C). Inverters last 10-15 years, easily replaceable. Quality panels lose only 0.5% efficiency yearly. This is a truly long-term investment!";
      }
      
      // Return on investment
      if (input.includes('roi') || input.includes('return') || input.includes('investment') || input.includes('worth')) {
        return "Solar delivers 18-25% annual ROI - better than most investments! Payback period: 4-5 years. After that, 20+ years of profit. Total 25-year returns: 300-400% of initial investment. Plus: increased property value (+4%), protection from rising electricity rates, zero risk of bill spikes. It's a no-brainer financially! What other investment pays for itself AND helps the planet?";
      }
      
      // Types of systems
      if (input.includes('on-grid') || input.includes('off-grid') || input.includes('hybrid') || input.includes('type')) {
        return "Three main types: 1) On-Grid (grid-tied): Most popular, no batteries, uses net metering, 95% efficient, lowest cost. 2) Off-Grid: Independent system with batteries, no grid connection, higher cost, great for remote areas. 3) Hybrid: Best of both, has batteries + grid connection, backup power during outages, highest cost. For most homes, on-grid is perfect and most economical!";
      }
      
      // Net metering
      if (input.includes('net meter') || input.includes('metering') || input.includes('export') || input.includes('grid')) {
        return "Net metering is brilliant! Your meter runs backward when generating excess power, banking credits with the electricity company. Use these credits at night or cloudy days. It's like using the grid as a free battery! No physical battery costs. You only pay for 'net' usage. Most states in India support net metering. This makes solar financially attractive even without batteries!";
      }
      
      // Battery and backup
      if (input.includes('battery') || input.includes('backup') || input.includes('storage') || input.includes('night')) {
        return "Batteries add backup but increase cost. Lithium batteries (₹80,000-1.5L for 5kWh) last 8-10 years, lead-acid (₹40,000-60,000) last 4-5 years. Good news: with net metering, most homes don't need batteries! Grid acts as free backup. Only get batteries if: frequent power cuts, off-grid location, or desire for complete energy independence. For typical homes, on-grid without batteries is most cost-effective!";
      }
      
      // Comparison with other sources
      if (input.includes('compare') || input.includes('better than') || input.includes('vs') || input.includes('versus')) {
        return "Solar vs. Grid: Solar costs ₹4-5/kWh over lifetime; grid rates ₹6-9/kWh (and rising!). Solar vs. Diesel: Diesel generators cost ₹18-25/kWh, pollute heavily, need constant fuel. Solar vs. Wind: Wind needs special locations, maintenance-intensive; solar works anywhere. Solar is the clear winner for homes - reliable, economical, clean, and hassle-free!";
      }
      
      // Permit and legal
      if (input.includes('permit') || input.includes('approval') || input.includes('legal') || input.includes('license')) {
        return "Don't worry about paperwork - we handle it all! Required: electricity company approval, net meter application, structural stability certificate (for roofs). Process takes 2-3 weeks. Systems under 10kW have simplified procedures. No special licenses needed for homeowners. Everything is legal and well-regulated. Government actively promotes solar installations!";
      }
      
      // Financing options
      if (input.includes('loan') || input.includes('emi') || input.includes('finance') || input.includes('pay')) {
        return "Multiple financing options available! Solar loans from banks at 7-9% interest for 5-7 years. Monthly EMI often equals or is less than your current electricity bill - meaning zero extra burden! Some companies offer: zero-down-payment plans, lease options, or pay-as-you-save models. After loan completion, you own the system and enjoy free power. Want help calculating EMI vs. savings?";
      }
      
      // Quality and brands
      if (input.includes('quality') || input.includes('brand') || input.includes('best') || input.includes('recommend')) {
        return "Quality matters for longevity! Top Indian brands: Tata, Adani, Waaree, Vikram Solar. International: Longi, Canadian Solar, JA Solar. Look for: Tier-1 manufacturer status, 25-year warranty, IEC certifications, MNRE approval. Monocrystalline panels are most efficient. For inverters: Solis, Growatt, SMA are reliable. We only work with certified, tested components. Quality systems last 30+ years!";
      }
      
      // Safety concerns
      if (input.includes('safe') || input.includes('danger') || input.includes('fire') || input.includes('electric shock')) {
        return "Solar panels are very safe! Low voltage DC system, surge protection included, automatic shutoff during faults. Panels are fire-retardant (Class A rated). Professional installation eliminates risks. Lightning protection can be added. No radiation or harmful emissions. Systems are tested to extreme safety standards. Millions of safe installations worldwide. Safer than conventional electrical systems!";
      }
      
      // Impact on property
      if (input.includes('property') || input.includes('home value') || input.includes('resale') || input.includes('sell house')) {
        return "Solar increases property value! Studies show 4% average increase - that's ₹2-4 lakhs for a ₹50L property! Homes sell faster too - 20% quicker on average. Buyers love lower electricity costs. It's a desirable upgrade like a renovated kitchen. Plus, you enjoy the benefits while living there. Solar is an investment that pays off whether you stay or sell!";
      }
      
      // Getting started
      if (input.includes('start') || input.includes('begin') || input.includes('first step') || input.includes('how to')) {
        return "Getting started is easy! Steps: 1) Free consultation - we assess your needs, 2) Site survey - check roof suitability, 3) Custom proposal - system size, cost, savings, 4) Approval - you decide, 5) Installation - 2-3 days, 6) Enjoy savings! Total timeline: 3-4 weeks. Zero hassle for you. Ready to schedule a free assessment? Our team will handle everything from design to activation!";
      }
      
      // Default intelligent response
      return "That's an interesting question about solar energy! Let me help you with that. Solar panels convert sunlight into electricity, helping you save money while protecting the environment. They're more affordable than ever with government subsidies and bank financing. The typical system pays for itself in 4-5 years and then provides free electricity for 25+ years. Could you tell me more about your specific interest - are you concerned about costs, installation, maintenance, or savings?";
    } 
    
    // Telugu responses
    else {
      // Short affirmative responses
      if (input === 'yes' || input === 'yeah' || input === 'yep' || input === 'sure' || input === 'ok' || input === 'okay' || 
          input === 'అవును' || input === 'సరే' || input === 'ఓకే') {
        return "చాలా బాగుంది! సోలార్ ఎనర్జీ ప్రయోజనాలను అర్థం చేసుకోవడంలో నేను మీకు సహాయం చేస్తాను. మీకు ఏ అంశం ఎక్కువ ఆసక్తి కలిగిస్తుంది - సేవింగ్స్, పర్యావరణ ప్రభావం, లేదా సిస్టమ్ ఇన్‌స్టాలేషన్?";
      }
      
      // Short negative responses
      if (input === 'no' || input === 'nope' || input === 'nah' || input === 'కాదు' || input === 'వద్దు') {
        return "పర్లేదు! సోలార్ ప్యానెల్స్, ఖర్చులు, సేవింగ్స్, లేదా ఇన్‌స్టాలేషన్ గురించి ఏదైనా అడగండి. మీరు సిద్ధంగా ఉన్నప్పుడు సమాచారం అందించడానికి నేను ఇక్కడ ఉన్నాను.";
      }
      
      // Convince me
      if (input.includes('convince') || input.includes('నన్ను ఒప్పించు') || input.includes('ఒప్పించు')) {
        return "కొన్ని ముఖ్యమైన విషయాలు చెప్తాను: సాధారణ 5kW సోలార్ సిస్టమ్ ఏడాదికి ₹60,000-90,000 విద్యుత్ బిల్లులలో ఆదా చేస్తుంది. 25 సంవత్సరాల వారెంటీతో, మొత్తం ₹15-22 లక్షల సేవింగ్స్! 30% ప్రభుత్వ సబ్సిడీలు, ఆస్తి విలువ పెరుగుదల, సున్నా కాలుష్యం - సోలార్ 4-5 సంవత్సరాలలో తిరిగి చెల్లిస్తుంది మరియు మన గ్రహాన్ని రక్షిస్తుంది! అదనంగా, విద్యుత్ రేట్ల పెరుగుదల గురించి మీరు ఎప్పుడూ చింతించాల్సిన అవసరం లేదు!";
      }
      
      // Greetings
      if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input === 'hi' || 
          input.includes('నమస్కారం') || input.includes('హలో') || input.includes('హాయ్')) {
        return "నమస్కారం! 👋 నేను మీ సోలార్ ఎనర్జీ సలహాదారుని. సోలార్ సేవింగ్స్, ఇన్‌స్టాలేషన్ ప్రక్రియ, లేదా పర్యావరణ ప్రయోజనాల గురించి మీకు ఆసక్తి ఉంటే, నేను ఇక్కడ సహాయం చేస్తాను! మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?";
      }
      
      // Cost and savings
      if (input.includes('cost') || input.includes('price') || input.includes('expensive') || 
          input.includes('ఖర్చు') || input.includes('ధర') || input.includes('ఖరీదు') || input.includes('ఎంత') || input.includes('వెల')) {
        return "సోలార్ ప్యానెల్ ఖర్చులు గత దశాబ్దంలో 85% తగ్గాయి! 3kW సిస్టమ్ ఖర్చు ₹1.5-2 లక్షలు (30% సబ్సిడీ తర్వాత). నెలకు ₹3,000-5,000 సేవింగ్స్‌తో, మీరు 4-5 సంవత్సరాలలో ఖర్చులు తిరిగి పొందుతారు. ఆ తర్వాత, 20+ సంవత్సరాలు స్వచ్ఛమైన లాభం! చాలా బ్యాంకులు 7-9% వడ్డీకి సోలార్ లోన్లు ఇస్తాయి. మీ ఇంటి కోసం వివరణాత్మక ఖర్చుల విశ్లేషణ కావాలా?";
      }
      
      if (input.includes('save') || input.includes('saving') || input.includes('bill') || 
          input.includes('సేవ్') || input.includes('ఆదా') || input.includes('బిల్లు')) {
        return "సోలార్ మీ విద్యుత్ బిల్లును 80-100% తగ్గిస్తుంది! నెలకు 300 యూనిట్లు వాడే (₹3,000+ బిల్లు) సాధారణ ఇంటికి ఏడాదికి ₹36,000-40,000 ఆదా అవుతుంది. 25 సంవత్సరాలలో, అది ₹9-10 లక్షల సేవింగ్స్! సిస్టమ్ 4-5 సంవత్సరాలలో తనను తాను చెల్లిస్తుంది, ఆ తర్వాత దశాబ్దాలపాటు ఉచిత విద్యుత్ ఉత్పత్తి చేస్తుంది. మీ నిర్దిష్ట సేవింగ్స్ అంచనా వేయాలా?";
      }
      
      // Installation
      if (input.includes('install') || input.includes('ఇన్‌స్టాల్') || input.includes('అమర్చు') || input.includes('ఏర్పాటు')) {
        return "ఇన్‌స్టాలేషన్ చాలా సులభం! రెసిడెన్షియల్ సిస్టమ్ కోసం కేవలం 2-3 రోజులు పడుతుంది. ప్రక్రియ: 1) సైట్ సర్వే (ఉచితం), 2) డిజైన్ & ఆమోదం (1 వారం), 3) ఇన్‌స్టాలేషన్ (2-3 రోజులు), 4) తనిఖీ & గ్రిడ్ కనెక్షన్ (1 వారం). మా సర్టిఫైడ్ ఎలక్ట్రీషియన్లు అనుమతులు మరియు పత్రాలతో సహా అన్నీ నిర్వహిస్తారు. మీ రోజువారీ దినచర్యకు కనీస అంతరాయం!";
      }
      
      // Maintenance
      if (input.includes('maintain') || input.includes('maintenance') || 
          input.includes('నిర్వహణ') || input.includes('మెయింటెనన్స్') || input.includes('సర్వీస్')) {
        return "సోలార్ ప్యానెల్స్‌కు చాలా తక్కువ నిర్వహణ అవసరం! ప్రతి 2-3 నెలలకు ఒకసారి శుభ్రం చేయండి (₹200-500 ఖర్చు) లేదా వర్షం సహజంగా చేయనివ్వండి. కదిలే భాగాలు లేవు అంటే కనీస అరుగుదల. ప్యానెల్స్ 25 సంవత్సరాల వారెంటీలు, ఇన్వర్టర్లు 5-10 సంవత్సరాలు. వార్షిక నిర్వహణ ఖర్చు: గరిష్టంగా ₹2,000-3,000. చాలా సిస్టమ్స్ దశాబ్దాలపాటు సమస్య లేకుండా పనిచేస్తాయి!";
      }
      
      // Efficiency
      if (input.includes('efficient') || input.includes('work') || input.includes('power') || 
          input.includes('సామర్థ్యం') || input.includes('పవర్') || input.includes('విద్యుత్') || input.includes('పని')) {
        return "ఆధునిక సోలార్ ప్యానెల్స్ 20-22% సమర్థవంతమైనవి, ఇన్‌స్టాల్ చేసిన ప్రతి kW కి రోజుకు 4-5 kWh ఉత్పత్తి చేస్తాయి (మంచి సూర్యరశ్మిలో). మేఘావృతమైన రోజులలో కూడా, అవి 10-25% అవుట్‌పుట్ ఉత్పత్తి చేస్తాయి. 5kW సిస్టమ్ రోజుకు 20-25 యూనిట్లు ఉత్పత్తి చేస్తుంది - చాలా ఇళ్లకు సరిపోతుంది! నెట్ మీటరింగ్ అదనపు పవర్ బ్యాంక్ చేయడానికి అనుమతిస్తుంది. వర్షాకాలంలో, మీ బ్యాంక్ చేసిన క్రెడిట్లు లోటును కవర్ చేస్తాయి. భారతదేశంలో సోలార్ ఏడాదికి 300+ రోజులు నమ్మదగ్గది!";
      }
      
      // Subsidies
      if (input.includes('subsidy') || input.includes('government') || 
          input.includes('సబ్సిడీ') || input.includes('ప్రభుత్వం') || input.includes('స్కీమ్')) {
        return "మంచి వార్త! ప్రభుత్వ సబ్సిడీలు సోలార్‌ను చాలా సౌకర్యవంతం చేస్తాయి: 10kW వరకు సిస్టమ్స్ కోసం 30% సబ్సిడీ (₹78,000 వరకు). ప్రక్రియ సులభం - మేము అన్ని పత్రాలు నిర్వహిస్తాము. అదనపు ప్రయోజనాలు: వ్యాపారాలకు 40% వేగవంతమైన తరుగుదల, పన్ను ప్రయోజనాలు, ప్రాధాన్యత గ్రిడ్ కనెక్షన్. చాలా రాష్ట్రాలు అదనపు ప్రోత్సాహకాలు ఇస్తాయి. ఈ సబ్సిడీలు మీ తిరిగి చెల్లింపు వ్యవధిని గణనీయంగా తగ్గిస్తాయి!";
      }
      
      // Environmental
      if (input.includes('environment') || input.includes('pollution') || input.includes('green') || 
          input.includes('పర్యావరణం') || input.includes('కాలుష్యం') || input.includes('హరిత')) {
        return "సోలార్ వాతావరణ మార్పును తెచ్చేది! 5kW సిస్టమ్ ఏటా 7-8 టన్నుల CO2 ఉద్గారాలను నివారిస్తుంది - 150 చెట్లను నాటడం లేదా 2 కార్లను రోడ్డుపై నుండి తీసివేయడంతో సమానం! 25 సంవత్సరాలలో, మీరు 175+ టన్నుల కార్బన్‌ను భర్తీ చేస్తారు. బొగ్గు విద్యుత్ గాలి మరియు నీటిని కలుషితం చేస్తుంది; సోలార్ 100% స్వచ్ఛమైనది. సోలార్‌కి వెళ్లడం ద్వారా, మీరు ఆరోగ్యాన్ని రక్షిస్తున్నారు, వనరులను పరిరక్షిస్తున్నారు, మరియు వాతావరణ మార్పుతో పోరాడుతున్నారు!";
      }
      
      // Space requirements
      if (input.includes('space') || input.includes('roof') || input.includes('area') || 
          input.includes('స్థలం') || input.includes('పైకప్పు') || input.includes('ఏరియా') || input.includes('పరిమాణం')) {
        return "మీకు ప్రతి kW కి సుమారు 100 చ.అ సెగ అవసరం. సాధారణ 3kW సిస్టమ్‌కి 300 చ.అ సెగ అవసరం - ఒక చిన్న బెడ్‌రూమ్ పరిమాణం. చాలా రెసిడెన్షియల్ పైకప్పులు 3-5kW సిస్టమ్స్‌ను సులభంగా ఉంచగలవు. ప్యానెల్స్ ఫ్లాట్ లేదా వాలు పైకప్పులు, గ్రౌండ్ మౌంట్స్, కార్పోర్ట్‌లపై కూడా వెళ్లగలవు! మేము మీ నిర్దిష్ట పైకప్పు కోసం లేఅవుట్ ఆప్టిమైజ్ చేస్తాము. ఓరియంటేషన్ మరియు షేడింగ్ మొత్తం స్థలం కంటే ముఖ్యం. ఉచిత పైకప్పు అసెస్‌మెంట్ కావాలా?";
      }
      
      // Weather
      if (input.includes('rain') || input.includes('monsoon') || input.includes('cloudy') || 
          input.includes('వర్షం') || input.includes('వానలు') || input.includes('ముసురు') || input.includes('వాతావరణం')) {
        return "సోలార్ ఏడాది పొడవునా పనిచేస్తుంది! అవును, భారీ మేఘాల సమయంలో అవుట్‌పుట్ 70-90% పడిపోతుంది, కానీ నెట్ మీటరింగ్ దీన్ని పరిష్కరిస్తుంది - అదనపు వేసవి ఉత్పత్తి క్రెడిట్లు వర్షాకాల లోటులను భర్తీ చేస్తాయి. వార్షిక ఉత్పత్తి స్థిరంగా ఉంటుంది. వర్షం వాస్తవానికి ప్యానెల్స్‌ను సహజంగా శుభ్రం చేయడం ద్వారా సహాయపడుతుంది! ప్యానెల్స్ వాటర్‌ప్రూఫ్, వడగండ్ల-నిరోధకం, మరియు తీవ్ర వాతావరణం కోసం పరీక్షించబడ్డాయి. భారతదేశం యొక్క 300+ సూర్యరశ్మి రోజులు సోలార్‌ను ప్రతిచోటా అత్యంత ఆచరణీయంగా చేస్తాయి!";
      }
      
      // Durability
      if (input.includes('durable') || input.includes('warranty') || input.includes('last') || 
          input.includes('మన్నిక') || input.includes('వారంటీ') || input.includes('జీవితకాలం') || input.includes('ఎంతకాలం')) {
        return "సోలార్ ప్యానెల్స్ దీర్ఘకాలం ఉండేలా నిర్మించబడ్డాయి! ప్రామాణిక వారంటీలు: 25 సంవత్సరాల పనితీరు (80% అవుట్‌పుట్ హామీ), 10-12 సంవత్సరాల ఉత్పత్తి లోపాలు. వాస్తవ జీవితకాలం: 30-35 సంవత్సరాలు! ప్యానెల్స్ వడగండ్లు, తుఫానులు, తీవ్ర ఉష్ణోగ్రతలను (-40°C నుండి +85°C) తట్టుకుంటాయి. ఇన్వర్టర్లు 10-15 సంవత్సరాలు ఉంటాయి, సులభంగా భర్తీ చేయవచ్చు. నాణ్యమైన ప్యానెల్స్ సంవత్సరానికి కేవలం 0.5% సామర్థ్యాన్ని కోల్పోతాయి. ఇది నిజంగా దీర్ఘకాలిక పెట్టుబడి!";
      }
      
      // ROI
      if (input.includes('roi') || input.includes('return') || input.includes('investment') || 
          input.includes('రాబడి') || input.includes('లాభం') || input.includes('పెట్టుబడి')) {
        return "సోలార్ 18-25% వార్షిక ROI అందిస్తుంది - చాలా పెట్టుబడుల కంటే మెరుగ్గా! తిరిగి చెల్లింపు వ్యవధి: 4-5 సంవత్సరాలు. ఆ తర్వాత, 20+ సంవత్సరాల లాభం. మొత్తం 25-సంవత్సరాల రాబడులు: ప్రారంభ పెట్టుబడిలో 300-400%. అదనంగా: పెరిగిన ఆస్తి విలువ (+4%), పెరుగుతున్న విద్యుత్ రేట్ల నుండి రక్షణ, బిల్లు స్పైక్‌ల యొక్క సున్నా ప్రమాదం. ఇది ఆర్థికంగా స్పష్టమైన ఎంపిక! ఏ ఇతర పెట్టుబడి తనను తాను చెల్లిస్తుంది మరియు గ్రహానికి సహాయపడుతుంది?";
      }
      
      // Default response
      return "సోలార్ ఎనర్జీ గురించి మీ ప్రశ్న ఆసక్తికరంగా ఉంది! దానికి సహాయం చేయనివ్వండి. సోలార్ ప్యానెల్స్ సూర్యరశ్మిని విద్యుత్‌గా మారుస్తాయి, పర్యావరణాన్ని రక్షిస్తూ డబ్బు ఆదా చేయడంలో మీకు సహాయపడుతుంది. ప్రభుత్వ సబ్సిడీలు మరియు బ్యాంక్ ఫైనాన్సింగ్‌తో అవి మునుపెన్నడూ లేనంత సౌకర్యవంతంగా ఉన్నాయి. సాధారణ సిస్టమ్ 4-5 సంవత్సరాలలో తనను తాను చెల్లిస్తుంది మరియు 25+ సంవత్సరాలు ఉచిత విద్యుత్ అందిస్తుంది. మీ నిర్దిష్ట ఆసక్తి గురించి మరింత చెప్పగలరా - మీకు ఖర్చులు, ఇన్‌స్టాలేషన్, నిర్వహణ, లేదా సేవింగ్స్ గురించి ఆందోళన ఉందా?";
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const botResponse = {
        text: getSmartResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🤖</div>
              <div>
                <h3 className="font-semibold text-lg">
                  {language === 'en' ? 'Solar Energy Assistant' : 'సోలార్ ఎనర్జీ సహాయకుడు'}
                </h3>
                <p className="text-xs text-blue-100">
                  {language === 'en' ? 'Always here to help' : 'ఎల్లప్పుడూ సహాయం చేయడానికి'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="px-3 py-1.5 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-sm font-medium transition-all"
                title={language === 'en' ? 'Switch to Telugu' : 'Switch to English'}
              >
                {language === 'en' ? '🇮🇳 తెలుగు' : '🇬🇧 EN'}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white hover:bg-opacity-20 rounded-lg p-1.5 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <div className="text-5xl mb-3">🤖</div>
                <p className="text-sm">
                  {language === 'en' 
                    ? 'Hi! Ask me anything about solar energy!' 
                    : 'హాయ్! సోలార్ ఎనర్జీ గురించి ఏదైనా అడగండి!'}
                </p>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-800 shadow-md rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === 'en' ? 'Type your message...' : 'మీ సందేశాన్ని టైప్ చేయండి...'}
                  className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="1"
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                />
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`absolute right-2 bottom-2 p-2 rounded-lg transition-all ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={isListening ? 'Stop recording' : 'Start voice input'}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-24 h-24 flex items-center justify-center shadow-2xl transition-all hover:scale-110 relative group animate-bounce"
        style={{
          boxShadow: '0 8px 20px rgba(37, 99, 235, 0.4)'
        }}
      >
        {isOpen ? (
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <span className="text-5xl">🤖</span>
            {messages.length === 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
            )}
          </div>
        )}
      </button>
    </div>
  );
};

export default FloatingChatbot;
