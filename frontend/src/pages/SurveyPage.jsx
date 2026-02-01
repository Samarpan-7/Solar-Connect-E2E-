import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Globe, Check } from 'lucide-react';
import axios from 'axios';

const SurveyPage = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en'); // 'en' or 'te'
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const content = {
    en: {
      title: 'Solar Energy Awareness Survey',
      subtitle: 'Help us understand your awareness and willingness to adopt solar energy',
      sections: [
        { name: 'Awareness', icon: '🌞' },
        { name: 'Perception & Value', icon: '💡' },
        { name: 'Willingness to Adopt', icon: '✨' },
        { name: 'Barriers & Challenges', icon: '🔧' },
        { name: 'Comparative Understanding', icon: '📊' }
      ],
      questions: [
        // Section 1: Awareness
        {
          id: 'q1',
          section: 0,
          question: 'Have you heard of solar energy or solar panels before?',
          type: 'single',
          options: [
            { text: 'Yes', value: 5 },
            { text: 'No', value: 0 }
          ]
        },
        {
          id: 'q2',
          section: 0,
          question: 'How would you rate your knowledge of solar energy?',
          type: 'single',
          options: [
            { text: 'Very high – I know how it works and its benefits', value: 5 },
            { text: 'Moderate – I know some benefits', value: 3 },
            { text: 'Low – I know very little', value: 1 },
            { text: 'None – I don\'t know anything', value: 0 }
          ]
        },
        {
          id: 'q3',
          section: 0,
          question: 'Are you aware that governments often provide subsidies or incentives for installing solar panels?',
          type: 'single',
          options: [
            { text: 'Yes, fully aware', value: 5 },
            { text: 'Heard about it but unsure', value: 3 },
            { text: 'No, not aware', value: 0 }
          ]
        },
        {
          id: 'q4',
          section: 0,
          question: 'Which of these benefits of solar energy are you aware of?',
          type: 'multiple',
          options: [
            { text: 'Reduces electricity bills', value: 2 },
            { text: 'Environmentally friendly (reduces carbon footprint)', value: 2 },
            { text: 'Increases property value', value: 1 },
            { text: 'Reliable energy during outages', value: 2 },
            { text: 'Low maintenance', value: 1 }
          ]
        },
        // Section 2: Perception & Value
        {
          id: 'q5',
          section: 1,
          question: 'How important is switching to renewable energy like solar to you personally?',
          type: 'single',
          options: [
            { text: 'Very important', value: 5 },
            { text: 'Somewhat important', value: 4 },
            { text: 'Neutral', value: 3 },
            { text: 'Not important', value: 1 }
          ]
        },
        {
          id: 'q6',
          section: 1,
          question: 'Compared to conventional electricity, how much do you think solar energy can save you in the long term?',
          type: 'single',
          options: [
            { text: 'A lot', value: 5 },
            { text: 'Some', value: 3 },
            { text: 'Very little', value: 1 },
            { text: 'Don\'t know', value: 0 }
          ]
        },
        {
          id: 'q7',
          section: 1,
          question: 'Using solar energy contributes significantly to protecting the environment.',
          type: 'single',
          options: [
            { text: 'Strongly agree', value: 5 },
            { text: 'Agree', value: 4 },
            { text: 'Neutral', value: 3 },
            { text: 'Disagree', value: 1 },
            { text: 'Strongly disagree', value: 0 }
          ]
        },
        // Section 3: Willingness to Adopt
        {
          id: 'q8',
          section: 2,
          question: 'Would you consider installing solar panels if the initial cost is partially covered by government incentives?',
          type: 'single',
          options: [
            { text: 'Definitely yes', value: 5 },
            { text: 'Maybe, need more info', value: 3 },
            { text: 'Unlikely', value: 1 },
            { text: 'Definitely no', value: 0 }
          ]
        },
        {
          id: 'q9',
          section: 2,
          question: 'How soon would you install solar panels if support were available?',
          type: 'single',
          options: [
            { text: 'Within 6 months', value: 5 },
            { text: 'Within 1 year', value: 4 },
            { text: 'After 1 year', value: 2 },
            { text: 'Not interested', value: 0 }
          ]
        },
        {
          id: 'q10',
          section: 2,
          question: 'Would you like a platform to compare multiple solar providers?',
          type: 'single',
          options: [
            { text: 'Yes, very interested', value: 5 },
            { text: 'Somewhat interested', value: 3 },
            { text: 'Not interested', value: 0 }
          ]
        },
        // Section 4: Barriers
        {
          id: 'q11',
          section: 3,
          question: 'What are the main reasons holding you back?',
          type: 'multiple',
          options: [
            { text: 'High installation cost', value: 1 },
            { text: 'Uncertainty about savings', value: 1 },
            { text: 'Lack of trustworthy providers', value: 1 },
            { text: 'Not enough technical knowledge', value: 1 },
            { text: 'Not aware of incentives', value: 1 },
            { text: 'Maintenance concerns', value: 1 }
          ]
        },
        {
          id: 'q12',
          section: 3,
          question: 'Confidence in identifying certified installer?',
          type: 'single',
          options: [
            { text: 'Very confident', value: 5 },
            { text: 'Somewhat confident', value: 3 },
            { text: 'Not confident', value: 0 }
          ]
        },
        {
          id: 'q13',
          section: 3,
          question: 'Would you like a system connecting to verified electricians/installers?',
          type: 'single',
          options: [
            { text: 'Yes', value: 5 },
            { text: 'Maybe', value: 3 },
            { text: 'No', value: 0 }
          ]
        },
        // Section 5: Comparative Understanding
        {
          id: 'q14',
          section: 4,
          question: 'Did you know solar panels can reduce electricity bills by 50–70%?',
          type: 'single',
          options: [
            { text: 'Yes', value: 5 },
            { text: 'No', value: 0 }
          ]
        },
        {
          id: 'q15',
          section: 4,
          question: 'How likely to switch after learning that solar saves money, protects environment, reduces fossil fuel use?',
          type: 'scale',
          min: 1,
          max: 5,
          minLabel: 'Not likely',
          maxLabel: 'Very likely'
        },
        {
          id: 'q16',
          section: 4,
          question: 'Would you consider solar as primary energy if uninterrupted power is ensured?',
          type: 'single',
          options: [
            { text: 'Yes', value: 5 },
            { text: 'Maybe', value: 3 },
            { text: 'No', value: 0 }
          ]
        },
        {
          id: 'q17',
          section: 4,
          question: 'Interested in tracking savings & carbon footprint after switching?',
          type: 'single',
          options: [
            { text: 'Very interested', value: 5 },
            { text: 'Somewhat interested', value: 3 },
            { text: 'Not interested', value: 0 }
          ]
        }
      ],
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit Survey',
      recommendations: {
        low: 'You have limited awareness about solar energy. Learn how it can save money and protect the environment. Explore our platform to compare providers and subsidies.',
        moderate: 'You know some benefits of solar energy. Consider exploring solar panel providers, cost comparisons, and available government incentives to make an informed decision.',
        high: 'You are well-informed and ready to adopt solar energy. Connect with verified installers, check subsidies, and start your journey toward clean and cost-effective energy today!'
      }
    },
    te: {
      title: 'సౌరశక్తి అవగాహన సర్వే',
      subtitle: 'మీ అవగాహన మరియు సౌరశక్తిని దత్తత తీసుకునే సిద్ధతను అర్థం చేసుకోవడానికి మాకు సహాయం చేయండి',
      sections: [
        { name: 'అవగాహన', icon: '🌞' },
        { name: 'అభిప్రాయం & విలువ', icon: '💡' },
        { name: 'దత్తత తీసుకునే సిద్ధత', icon: '✨' },
        { name: 'సమస్యలు', icon: '🔧' },
        { name: 'పోలిక & అవగాహన', icon: '📊' }
      ],
      questions: [
        {
          id: 'q1',
          section: 0,
          question: 'మీరు ఇంతకు ముందు సౌరశక్తి లేదా సోలార్ ప్యానెల్స్ గురించి విన్నారా?',
          type: 'single',
          options: [
            { text: 'అవును', value: 5 },
            { text: 'కాదు', value: 0 }
          ]
        },
        {
          id: 'q2',
          section: 0,
          question: 'సౌరశక్తి గురించి మీ పరిజ్ఞానాన్ని ఎలా రేట్ చేస్తారు?',
          type: 'single',
          options: [
            { text: 'చాలా తెలుసు – ఇది ఎలా పనిచేస్తుందో మరియు లాభాలు తెలుసు', value: 5 },
            { text: 'మధ్యస్థం – కొన్ని లాభాలు తెలుసు', value: 3 },
            { text: 'తక్కువ – చాలా తక్కువ తెలుసు', value: 1 },
            { text: 'తెలియదు – ఏమీ తెలుసు లేదు', value: 0 }
          ]
        },
        {
          id: 'q3',
          section: 0,
          question: 'ప్రభుత్వాలు తరచుగా సోలార్ ప్యానెల్స్ స్థాపనకు సబ్సిడీలు లేదా ప్రోత్సాహకాలు అందిస్తాయని మీకు తెలుసా?',
          type: 'single',
          options: [
            { text: 'అవును, పూర్తి అవగాహన', value: 5 },
            { text: 'విన్నాను కానీ ఖచ్చితంగా కాదు', value: 3 },
            { text: 'కాదు, తెలియదు', value: 0 }
          ]
        },
        {
          id: 'q4',
          section: 0,
          question: 'సౌరశక్తి యొక్క ఈ లాభాలలో ఏవి మీకు తెలుసు?',
          type: 'multiple',
          options: [
            { text: 'విద్యుత్ బిల్లులు తగ్గుతాయి', value: 2 },
            { text: 'పర్యావరణానికి మంచిది (కార్బన్ తగ్గిస్తుంది)', value: 2 },
            { text: 'ఆస్తి విలువ పెరుగుతుంది', value: 1 },
            { text: 'విద్యుత్ నిలిచినప్పుడు కూడా ఉపయోగపడుతుంది', value: 2 },
            { text: 'తక్కువ నిర్వహణ అవసరం', value: 1 }
          ]
        },
        {
          id: 'q5',
          section: 1,
          question: 'సౌరశక్తి వంటి పునరుత్పాదక శక్తికి మారడం మీకు వ్యక్తిగతంగా ఎంత ముఖ్యము?',
          type: 'single',
          options: [
            { text: 'చాలా ముఖ్యము', value: 5 },
            { text: 'కొంత ముఖ్యము', value: 4 },
            { text: 'మధ్యస్థం', value: 3 },
            { text: 'ముఖ్యము కాదు', value: 1 }
          ]
        },
        {
          id: 'q6',
          section: 1,
          question: 'సాంప్రదాయ విద్యుత్తో పోలిస్తే, దీర్ఘకాలంలో సౌరశక్తి మీకు ఎంత పొదుపు చేస్తుందని మీరు అనుకుంటున్నారు?',
          type: 'single',
          options: [
            { text: 'చాలా', value: 5 },
            { text: 'కొంత', value: 3 },
            { text: 'తక్కువ', value: 1 },
            { text: 'తెలియదు', value: 0 }
          ]
        },
        {
          id: 'q7',
          section: 1,
          question: 'సౌరశక్తిని ఉపయోగించడం పర్యావరణాన్ని రక్షించడంలో గణనీయంగా దోహదపడుతుంది.',
          type: 'single',
          options: [
            { text: 'పూర్తిగా అంగీకరిస్తున్నాను', value: 5 },
            { text: 'అంగీకరిస్తున్నాను', value: 4 },
            { text: 'మధ్యస్థం', value: 3 },
            { text: 'అంగీకరించను', value: 1 },
            { text: 'పూర్తిగా అంగీకరించను', value: 0 }
          ]
        },
        {
          id: 'q8',
          section: 2,
          question: 'ప్రారంభ ఖర్చు ప్రభుత్వ ప్రోత్సాహకాలతో పాక్షికంగా కవర్ చేయబడితే మీరు సోలార్ ప్యానెల్స్ స్థాపించడాన్ని పరిగణిస్తారా?',
          type: 'single',
          options: [
            { text: 'ఖచ్చితంగా అవును', value: 5 },
            { text: 'కావచ్చు, మరింత సమాచారం కావాలి', value: 3 },
            { text: 'ఎక్కువగా కాదు', value: 1 },
            { text: 'ఖచ్చితంగా కాదు', value: 0 }
          ]
        },
        {
          id: 'q9',
          section: 2,
          question: 'మద్దతు అందుబాటులో ఉంటే మీరు ఎంత త్వరగా సోలార్ ప్యానెల్స్ స్థాపిస్తారు?',
          type: 'single',
          options: [
            { text: '6 నెలల్లో', value: 5 },
            { text: '1 సంవత్సరంలో', value: 4 },
            { text: '1 సంవత్సరం తర్వాత', value: 2 },
            { text: 'ఆసక్తి లేదు', value: 0 }
          ]
        },
        {
          id: 'q10',
          section: 2,
          question: 'బహుళ సోలార్ ప్రొవైడర్‌లను పోల్చడానికి మీరు ప్లాట్‌ఫారమ్ కావాలనుకుంటున్నారా?',
          type: 'single',
          options: [
            { text: 'అవును, చాలా ఆసక్తి', value: 5 },
            { text: 'కొంత ఆసక్తి', value: 3 },
            { text: 'ఆసక్తి లేదు', value: 0 }
          ]
        },
        {
          id: 'q11',
          section: 3,
          question: 'మిమ్మల్ని వెనుకకు తీసుకెళ్తున్న ప్రధాన కారణాలు ఏమిటి?',
          type: 'multiple',
          options: [
            { text: 'స్థాపన ఖర్చు ఎక్కువ', value: 1 },
            { text: 'పొదుపు పై నిర్ధారించలేము', value: 1 },
            { text: 'నమ్మకమైన ప్రొవైడర్స్ లేమి', value: 1 },
            { text: 'సాంకేతిక పరిజ్ఞానం తక్కువ', value: 1 },
            { text: 'ప్రోత్సాహాల గురించి తెలియదు', value: 1 },
            { text: 'నిర్వహణ సమస్యలు', value: 1 }
          ]
        },
        {
          id: 'q12',
          section: 3,
          question: 'ధృవీకరించబడిన ఇన్‌స్టాలర్‌ను గుర్తించడంలో నమ్మకం?',
          type: 'single',
          options: [
            { text: 'చాలా నమ్మకం', value: 5 },
            { text: 'కొంత నమ్మకం', value: 3 },
            { text: 'నమ్మకం లేదు', value: 0 }
          ]
        },
        {
          id: 'q13',
          section: 3,
          question: 'ధృవీకరించబడిన ఎలక్ట్రీషియన్లు/ఇన్‌స్టాలర్‌లకు కనెక్ట్ అయ్యే సిస్టమ్ కావాలా?',
          type: 'single',
          options: [
            { text: 'అవును', value: 5 },
            { text: 'కావచ్చు', value: 3 },
            { text: 'కాదు', value: 0 }
          ]
        },
        {
          id: 'q14',
          section: 4,
          question: 'సోలార్ ప్యానెల్స్ విద్యుత్ బిల్లులను 50-70% తగ్గించగలవని మీకు తెలుసా?',
          type: 'single',
          options: [
            { text: 'అవును', value: 5 },
            { text: 'కాదు', value: 0 }
          ]
        },
        {
          id: 'q15',
          section: 4,
          question: 'సౌర శక్తి డబ్బు ఆదా చేస్తుంది, పర్యావరణాన్ని రక్షిస్తుంది, శిలాజ ఇంధన వినియోగాన్ని తగ్గిస్తుందని తెలుసుకున్న తర్వాత మారే అవకాశం ఎంత?',
          type: 'scale',
          min: 1,
          max: 5,
          minLabel: 'తక్కువ',
          maxLabel: 'చాలా'
        },
        {
          id: 'q16',
          section: 4,
          question: 'నిరంతర విద్యుత్ హామీ ఇస్తే మీరు సౌరశక్తిని ప్రాథమిక శక్తిగా పరిగణిస్తారా?',
          type: 'single',
          options: [
            { text: 'అవును', value: 5 },
            { text: 'కావచ్చు', value: 3 },
            { text: 'కాదు', value: 0 }
          ]
        },
        {
          id: 'q17',
          section: 4,
          question: 'మారిన తర్వాత పొదుపులు & కార్బన్ ఫుట్‌ప్రింట్‌ను ట్రాక్ చేయడంలో ఆసక్తి ఉందా?',
          type: 'single',
          options: [
            { text: 'చాలా ఆసక్తి', value: 5 },
            { text: 'కొంత ఆసక్తి', value: 3 },
            { text: 'ఆసక్తి లేదు', value: 0 }
          ]
        }
      ],
      next: 'తదుపరి',
      previous: 'మునుపటి',
      submit: 'సర్వే సమర్పించండి',
      recommendations: {
        low: 'మీకు సౌరశక్తి గురించి తక్కువ అవగాహన ఉంది. ఇది ఎలా డబ్బు మరియు పర్యావరణాన్ని రక్షించగలదో తెలుసుకోండి. మా ప్లాట్‌ఫామ్‌లో ప్రొవైడర్స్ మరియు సబ్సిడీలను పోల్చండి.',
        moderate: 'మీకు సౌరశక్తి యొక్క కొన్ని లాభాలు తెలుసు. సౌర ప్యానెల్ ప్రొవైడర్స్, ఖర్చు పోలికలు మరియు ప్రభుత్వ ప్రోత్సాహకాలను పరిశీలించి, సమాచారం ఆధారిత నిర్ణయం తీసుకోండి.',
        high: 'మీకు సరిగ్గా తెలుసు మరియు మీరు సౌరశక్తిని దత్తత తీసుకునేందుకు సిద్ధంగా ఉన్నారు. ధృవీకరించబడిన ఇన్‌స్టాలర్లతో కనెక్ట్ అవ్వండి, సబ్సిడీలను తనిఖీ చేయండి మరియు శుభ్రమైన, ఖర్చు-సమర్థమైన శక్తి వైపు మీ ప్రయాణాన్ని మొదలు పెట్టండి.'
      }
    }
  };

  const t = content[language];

  const handleAnswer = (questionId, value, isMultiple = false, optionIndex = null) => {
    if (isMultiple) {
      const current = answers[questionId] || [];
      const newValue = current.includes(optionIndex)
        ? current.filter(idx => idx !== optionIndex)
        : [...current, optionIndex];
      setAnswers({ ...answers, [questionId]: newValue });
    } else {
      setAnswers({ ...answers, [questionId]: value });
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    t.questions.forEach(q => {
      const answer = answers[q.id];
      if (!answer) return;

      if (Array.isArray(answer)) {
        // For multiple choice, answer contains indices
        totalScore += answer.reduce((sum, idx) => sum + (q.options[idx]?.value || 0), 0);
      } else {
        totalScore += answer;
      }
    });
    return totalScore;
  };

  const getRecommendation = (score) => {
    if (score <= 30) return t.recommendations.low;
    if (score <= 55) return t.recommendations.moderate;
    return t.recommendations.high;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const totalScore = calculateScore();
    const recommendation = getRecommendation(totalScore);

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/survey/submit',
        {
          total_score: totalScore,
          recommendation: recommendation,
          awareness_level: totalScore <= 30 ? 'none' : totalScore <= 55 ? 'moderate' : 'good',
          willing_to_adopt: answers.q8 >= 3 ? 'yes' : 'maybe',
          budget_range: 'Not specified',
          property_type: 'residential',
          electricity_bill_monthly: 0,
          primary_concern: 'General inquiry'
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setResult({ score: totalScore, recommendation });
      setShowResult(true);
    } catch (error) {
      console.error('Survey submission error:', error);
      alert('Failed to submit survey. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentQuestions = t.questions.filter(q => q.section === currentSection);
  const progress = ((currentSection + 1) / t.sections.length) * 100;

  if (showResult) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="card max-w-2xl w-full text-center">
          <div className="inline-block p-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6">
            <Check className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">{language === 'en' ? 'Survey Complete!' : 'సర్వే పూర్తయింది!'}</h1>
          <div className="mb-6">
            <div className="text-5xl font-bold text-solar-600 mb-2">{result.score}</div>
            <div className="text-gray-600">{language === 'en' ? 'Total Score' : 'మొత్తం స్కోర్'}</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-lg mb-2">{language === 'en' ? 'Your Recommendation:' : 'మీ సిఫార్సు:'}</h3>
            <p className="text-gray-700 leading-relaxed">{result.recommendation}</p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
          >
            {language === 'en' ? 'Explore Solar Solutions' : 'సౌర పరిష్కారాలను అన్వేషించండి'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Sun className="w-10 h-10 text-solar-500" />
              <div>
                <h1 className="text-2xl font-bold">{t.title}</h1>
                <p className="text-gray-600 text-sm">{t.subtitle}</p>
              </div>
            </div>
            <button
              onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Globe className="w-5 h-5" />
              <span className="font-semibold">{language === 'en' ? 'తెలుగు' : 'English'}</span>
            </button>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{t.sections[currentSection].icon} {t.sections[currentSection].name}</span>
              <span>{currentSection + 1} / {t.sections.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-solar-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {currentQuestions.map((question, idx) => (
            <div key={question.id} className="card">
              <h3 className="font-bold text-lg mb-4">
                {idx + 1}. {question.question}
              </h3>

              {question.type === 'scale' ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    {[1, 2, 3, 4, 5].map(num => (
                      <button
                        key={num}
                        onClick={() => handleAnswer(question.id, num)}
                        className={`w-14 h-14 rounded-full font-bold text-lg transition-all ${
                          answers[question.id] === num
                            ? 'bg-solar-500 text-white shadow-lg scale-110'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{question.minLabel}</span>
                    <span>{question.maxLabel}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {question.options.map((option, optIdx) => (
                    <label
                      key={optIdx}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        question.type === 'multiple'
                          ? (answers[question.id] || []).includes(optIdx)
                            ? 'border-solar-500 bg-solar-50'
                            : 'border-gray-200 hover:border-solar-300'
                          : answers[question.id] === option.value
                          ? 'border-solar-500 bg-solar-50'
                          : 'border-gray-200 hover:border-solar-300'
                      }`}
                    >
                      <input
                        type={question.type === 'multiple' ? 'checkbox' : 'radio'}
                        name={question.id}
                        checked={
                          question.type === 'multiple'
                            ? (answers[question.id] || []).includes(optIdx)
                            : answers[question.id] === option.value
                        }
                        onChange={() => handleAnswer(question.id, option.value, question.type === 'multiple', optIdx)}
                        className="w-5 h-5 text-solar-500"
                      />
                      <span className="ml-3 flex-1">{option.text}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {currentSection > 0 && (
            <button
              onClick={() => setCurrentSection(currentSection - 1)}
              className="btn-secondary"
            >
              {t.previous}
            </button>
          )}
          {currentSection < t.sections.length - 1 ? (
            <button
              onClick={() => setCurrentSection(currentSection + 1)}
              className="btn-primary ml-auto"
            >
              {t.next}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary ml-auto disabled:opacity-50"
            >
              {loading ? (language === 'en' ? 'Submitting...' : 'సమర్పిస్తోంది...') : t.submit}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
