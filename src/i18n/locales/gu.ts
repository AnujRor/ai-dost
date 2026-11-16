import type { TranslationKey } from './hi';

const gu: Record<TranslationKey, string> = {
  // ---------- common ----------
  'common.appName': 'AI મિત્ર',
  'common.you': 'તમે',
  'common.assistant': 'મારો AI મિત્ર',
  'common.newChat': 'નવી વાતચીત',
  'common.photoDocument': 'ફોટો દસ્તાવેજ',
  'common.back': 'પાછા',

  // ---------- language picker ----------
  'lang.label': 'ભાષા',
  'lang.title': 'એપની ભાષા બદલો',
  'lang.aria': 'ભાષા પસંદ કરો',
  'lang.hint': 'આખો સ્ક્રીન આ જ ભાષામાં બદલાઈ જશે.',

  // ---------- header ----------
  'header.savedChatsTitle': 'સાચવેલી ચેટ અને પરિસ્થિતિઓ',
  'header.openSidebar': 'સાઇડબાર ખોલો',
  'header.alwaysWithYou': 'હંમેશા તમારી સાથે',
  'header.modesCount': '{name} • ૪ મોડ',
  'header.changePersona': 'તમારા મિત્રની શૈલી બદલો',
  'header.modeLabel': 'મોડ:',
  'header.billDocTitle': 'બિલ કે દસ્તાવેજ સમજાવો',
  'header.billNoticeLabel': 'બિલ / સૂચના',
  'header.boosterTitle': 'જોક, શાયરી, રોજનું ઉત્સાહ',
  'header.boosterLabel': 'બૂસ્ટર',
  'header.voiceOn': 'મિત્રનો અવાજ: ચાલુ',
  'header.voiceOff': 'મિત્રનો અવાજ: બંધ (મ્યુટ)',
  'header.toggleVoice': 'અવાજ ચાલુ/બંધ કરો',
  'header.newChatTitle': 'નવી વાત શરૂ કરો',
  'header.newChatAria': 'નવી ચેટ',
  'header.aboutTitle': 'મારા AI મિત્ર વિશે',
  'header.aboutAria': 'એપ વિશે',

  // ---------- category bar ----------
  'category.heading': 'શ્રેણી:',
  'category.auto': 'ઓટો (તે જાતે સમજી જશે)',
  'category.explain': '૧. સમજાવો',
  'category.emotional': '૨. મનનો વાત',
  'category.advice': '૩. સલાહ અને જવાબ',
  'category.fun': '૪. મજા અને હાસ્ય',

  // ---------- chat bubble ----------
  'bubble.me': 'હું',
  'bubble.photo': 'ફોટો',
  'bubble.photoNotSaved': '(ફોટો સેવ ન થઈ શક્યો)',
  'bubble.uploadedAlt': 'અપલોડ કરેલો ફોટો',
  'bubble.zoomTitle': 'ફોટો મોટો કરો',
  'bubble.zoomedAlt': 'મોટો કરેલો ફોટો',
  'bubble.typing': 'જવાબ લખું છું...',
  'bubble.stopVoice': 'અવાજ બંધ કરો',
  'bubble.listenVoice': 'મિત્રનો અવાજ સાંભળો',
  'bubble.speaking': 'બોલી રહ્યું છે...',
  'bubble.listen': 'સાંભળો',
  'bubble.copyTitle': 'ટેક્સ્ટ કૉપિ કરો',
  'bubble.copied': 'કૉપિ થઈ ગયું!',
  'bubble.copy': 'કૉપિ',
  'bubble.reexplainTitle': 'વધુ સરળ ભાષામાં સમજાવો',
  'bubble.reexplain': 'વધુ સરળ ભાષા',

  // ---------- chat input ----------
  'input.onlyImages': 'કૃપા કરીને ફક્ત ઇમેજ (JPG, PNG, WebP) અપલોડ કરો.',
  'input.photoTooBig': 'ફોટો ઘણો મોટો છે (૧૫MB કરતાં વધુ). નાનો ફોટો મોકલો.',
  'input.voiceError': 'વોઇસ રેકોર્ડિંગમાં ભૂલ થઈ. કૃપા કરીને ફરી પ્રયાસ કરો.',
  'input.noSpeechRecognition': 'તમારા બ્રાઉઝરમાં સ્પીચ રેકોગ્નિશન ઉપલબ્ધ નથી.',
  'input.previewAlt': 'અપલોડ કરેલું પૂર્વદર્શન',
  'input.photoAttached': 'ફોટો ઉમેરાયો છે',
  'input.photoWillBeRead': 'ફોટો/દસ્તાવેજ વાંચીને સમજાવાશે',
  'input.removeImage': 'ઇમેજ દૂર કરો',
  'input.listening': 'મિત્ર સાંભળી રહ્યું છે... બોલો',
  'input.stop': 'બંધ કરો',
  'input.attachTitle': 'ફોટો / બિલ / સૂચના અપલોડ કરો',
  'input.phImage': 'આ ફોટા વિશે તમને શું જાણવું છે? (મોકલવા Enter)',
  'input.phExplain': 'કંઈક સમજાવવું છે? દા.ત. "વીજનું બિલ" અથવા "SIP શું છે"...',
  'input.phEmotional': 'મનની વાત કરો, મિત્ર સાંભળી રહ્યું છે...',
  'input.phAdvice': 'કઈ બાબતે સલાહ કે સંદેશનો જવાબ જોઈએ છે?...',
  'input.phFun': 'જોક, વાર્તા કે શાયરી માંગો...',
  'input.phDefault': 'ગમેતે ભાષામાં લખો કે ફોટો મોકલો...',
  'input.listeningTitle': 'સાંભળી રહ્યું છે... બંધ કરવા ક્લિક કરો',
  'input.voiceInputTitle': 'બોલો (વોઇસ ઇનપુટ)',
  'input.sendTitle': 'સંદેશ મોકલો',
  'input.footer': 'મારો AI મિત્ર • ગમેતે ભાષામાં મદદ',
  'input.shiftEnter': 'નવી લાઇન માટે Shift + Enter',

  // ---------- welcome hero ----------
  'welcome.badge': 'દરેક મોડમાં તમારી સાથે રહેનારો મિત્ર',
  'welcome.greeting': 'નમસ્તે! હું',
  'welcome.brand': 'મારો AI મિત્ર',
  'welcome.intro':
    'કોઈ વિષય સમજાવવો હોય, મન હળવું કરવું હોય, WhatsApp પર જવાબની સલાહ જોઈતી હોય, કે થોડી મજા જોઈતી હોય — હું હંમેશા તમારી સાથે છું.',
  'welcome.tagAnyLanguage': 'ગમેતે ભાષામાં વાત કરો',
  'welcome.tagPrivacy': 'કોઈ જાતી નહીં, સંપૂર્ણ ગોપનીયતા',
  'welcome.myTasks': 'મારા ૪ મુખ્ય કાર્યો',
  'welcome.tapAny': 'ગમેતે પણ ટેપ કરો',
  'welcome.try': 'અજમાવો',
  'welcome.popular': 'લોકપ્રિય પ્રશ્નો અને વિષયો',
  'welcome.p1.title': '૧. સમજાવવું',
  'welcome.p1.sub': 'શીખવું અને દસ્તાવેજો',
  'welcome.p1.desc':
    'બિલ, અઘરા વિષય, સરકારી સૂચના, દવાની પત્રિકા કે ગૂંચવાયેલો લખાણ — બધું સરળ ભાષામાં સમજાવો.',
  'welcome.p1.sample': 'વીજનું બિલ અને સબસિડી સમજાવો',
  'welcome.p2.title': '૨. મનનો વાત',
  'welcome.p2.sub': 'ઉત્સાહ અને સહાય',
  'welcome.p2.desc':
    'મન ખરાબ હોય, તણાવ હોય, અથવા ફક્ત વાત કરવી હોય — કોઈ જાતી કર્યા વગર સાચા મિત્ર જેવું સાંભળી જશે અને ઉત્સાહ આપશે.',
  'welcome.p2.sample': 'આજે થોડો થાકેલો છું અને તણાવ છે, વાત કરીએ',
  'welcome.p3.title': '૩. સલાહ અને જવાબ',
  'welcome.p3.sub': 'નિર્ણયો અને સંદેશ',
  'welcome.p3.desc':
    'WhatsApp પર શું જવાબ આપવો, બોસને રજા કેવી રીતે માંગવી, કે કઈ નિર્ણય લેવો — ૨-૩ તૈયાર વિકલ્પ મળશે.',
  'welcome.p3.sample': 'બોસને રજા માંગવા માટે ૩ તૈયાર સંદેશ આપો',
  'welcome.p4.title': '૪. મજા અને હાસ્ય',
  'welcome.p4.sub': 'જોક, શાયરી અને વાર્તાઓ',
  'welcome.p4.desc':
    'મજાકર દેશી જોક, હૃદયને અડતી શાયરી, કોયડા કે રમૂજી વાર્તાઓ થી દિવસનો મન હળવો કરો.',
  'welcome.p4.sample': 'એક મજાકર તાજેતરનો દેશી જોક સાંભળો',

  // ---------- quick actions toolbar ----------
  'qa.heading': 'બૂસ્ટર:',
  'qa.joke': 'દેશી જોક',
  'qa.shayari': 'સુંદર શાયરી',
  'qa.motivation': 'રોજનું ઉત્સાહ',
  'qa.paheli': 'એક કોયડો પૂછો',

  // ---------- sidebar ----------
  'sidebar.title': 'મારો AI મિત્ર',
  'sidebar.subtitle': 'ચેટ ઇતિહાસ અને ટૂલ્સ',
  'sidebar.close': 'સાઇડબાર બંધ કરો',
  'sidebar.newChat': 'નવી વાત શરૂ કરો',
  'sidebar.savedChats': 'સાચવેલી ચેટ ({count})',
  'sidebar.samples': 'નમૂના પરિસ્થિતિઓ',
  'sidebar.search': 'વાતચીત શોધો...',
  'sidebar.noHistory': 'હજી કોઈ ચેટ ઇતિહાસ નથી.',
  'sidebar.pinned': 'પિન કરેલી ચેટ',
  'sidebar.unpin': 'પિન દૂર કરો',
  'sidebar.delete': 'કાઢી નાખો',
  'sidebar.recent': 'તાજેતરની ચેટ',
  'sidebar.pinTop': 'ઉપર પિન કરો',
  'sidebar.trySamples': 'આ નમૂના પરિસ્થિતિઓ એક ટેપમાં અજમાવો:',
  'sidebar.downloadBackup': 'વાતચીતની બેકઅપ ફાઇલ ડાઉનલોડ કરો',
  'sidebar.savedTxt': 'TXT સેવ થયું',
  'sidebar.export': 'ચેટ એક્સપોર્ટ કરો',
  'sidebar.version': 'AI મિત્ર v1.0',

  // ---------- persona modal ----------
  'persona.title': 'તમારા મિત્રની શૈલી (પર્સોના)',
  'persona.subtitle': 'પસંદ કરો કે તમારો મિત્ર તમારી સાથે કેવી રીતે બોલવો છે',
  'persona.footer': 'તમે ગમેતે પણ તમારી પસંદીદી શૈલી બદલી શકો છો.',

  // ---------- document helper modal ----------
  'doc.title': 'બિલ કે સૂચના સમજાવો',
  'doc.subtitle': 'ફોટો મોકલો કે નમૂનો ટેમ્પ્લેટ જુઓ',
  'doc.upload': 'તમારા બિલ કે દસ્તાવેજનો ફોટો અપલોડ કરો',
  'doc.uploadHint': 'વીજનું બિલ, બેંક સૂચના, દવાની પત્રિકા કે ગૂંચવાયેલો કરાર',
  'doc.samples': 'અથવા આ નમૂના પરિસ્થિતિઓ અજમાવો:',
  'doc.footer': 'મારો AI મિત્ર કોઈ જટિલ શબ્દો વગર સીધી અને સરળ ભાષામાં સમજાવશે.',

  // ---------- booster modal ----------
  'booster.title': 'તરત મૂડ બૂસ્ટર',
  'booster.subtitle': 'એક ટેપમાં તમારા મિત્ર પાસેથી',
  'booster.footer': 'તમારો દિવસ ખુશ કરવા તમારો મિત્ર હંમેશા તૈયાર છે!',
  'booster.joke.title': 'દેશી જોક અને મજા',
  'booster.joke.desc': 'તાજું, સાફું અને મજાકર જોક સાંભળીને ચહેરા પર હાસ્ય આવશે.',
  'booster.shayari.title': 'સુંદર શાયરી',
  'booster.shayari.desc': 'જીવન, મિત્રતા કે હિંમત પર હૃદયને અડતી ૨-૪ લાઇનો.',
  'booster.thought.title': 'મિત્રનો રોજનો સંદેશ',
  'booster.thought.desc': 'સાકારાત્મક ઊર્જા સાથે દિવસ શરૂ કરવા.',
  'booster.paheli.title': 'બુદ્ધિનો કોયડો (Riddle)',
  'booster.paheli.desc': 'બુદ્ધિને થોડો કામ આપતો એક ચતુર કોયડો!',

  // ---------- about modal ----------
  'about.title': 'AI મિત્ર — તમારું બધું એક સાથે',
  'about.subtitle': 'મિત્રતાપૂર્વક, સરળ, ગરમીભરેલું અને જાતી વગરનું',
  'about.intro':
    '"AI મિત્ર" એવો સાથી છે જે દરેક વ્યક્તિની દરેક પરિસ્થિતિમાં મદદ કરે છે — તમે વિદ્યાર્થી હો, ગૃહિણી, વ્યાપારી કે વૃદ્ધ હો. તે તમારા જેવો મિત્ર જેવો, ઠીક તમારી જ ભાષામાં બોલે છે — હિન્દી, English, રોમન હિન્દી કે દુનિયાની કોઈ પણ ભાષા.',
  'about.tasks': 'AI મિત્રના ૪ મુખ્ય કાર્યો:',
  'about.task1': '૧. સમજાવવું (શીખવું)',
  'about.task1desc':
    'કોઈ પણ વિષય, વીજ/પાણીનું બિલ, સરકારી સૂચના, દવાની પત્રિકા કે ફોટો — કોઈ ભારે ટેકનિકલ શબ્દો વગર રોજિંદાની સરળ ભાષામાં સમજાવવું.',
  'about.task2': '૨. મનનો વાત (ઉત્સાહ)',
  'about.task2desc':
    'મન ખરાબ, તણાવ કે થાક — કોઈ જાતી કર્યા વગર સાચા મિત્ર જેવું સાંભળવું, ભાવનાત્મક સહાય અને હળવું ઉત્સાહ આપવું.',
  'about.task3': '૩. સલાહ અને જવાબના સૂચનો',
  'about.task3desc':
    'WhatsApp પર શું જવાબ આપવો, અજીબ સ્થિતિમાં શું બોલવું કે નિર્ણય કેવી રીતે લેવો — ૨-૩ સ્પષ્ટ વિકલ્પ તૈયાર કરી આપવા.',
  'about.task4': '૪. મજા અને મનોરંજન',
  'about.task4desc':
    'દેશી જોક, હૃદયને અડતી શાયરી, મજાકર વાર્તાઓ અને કોયડા થી મન હળવું કરવું અને ચહેરા પર હાસ્ય લાવવું.',
  'about.values': 'ખાસ નિયમો (મુખ્ય બાબતો)',
  'about.value1': 'હંમેશા સન્માનજનક અને મિત્રતાપૂર્વક રહેવું, ક્યારેય અસભ્ય કે રોબોટિક ન લાગવું.',
  'about.value2': 'સીધું, સાફું અને ઉપયોગી જવાબ આપવો, વધારે ફાલતુ લાંબું કર્યા વગર.',
  'about.value3': 'અવાજથી લખવું (Voice input) અને અવાજમાં સાંભળવું (સાંભળો) સાથે સરળ વાતચીત.',
  'about.close': 'સમજાઈ ગયું, ચાલો વાત કરીએ!',

  // ---------- app-level messages ----------
  'app.tooBig': 'ફોટો કે ચેટ ઘણી મોટી છે, નાનો ફોટો મોકલો અથવા નવી ચેટ શરૂ કરો',
  'app.answerReady': 'મિત્ર, જવાબ તૈયાર છે!',
  'app.networkError': 'મિત્ર, થોડી નેટવર્ક મુશ્કેલી: "{error}". એક વાર ફરી પ્રયાસ કરો.',
  'app.geminiKeyError':
    '⚠️ **Google AI Studio API Key અપડેટ કરવું જરૂરી છે**\n\nGoogle એ તમારા હાલના Gemini API Key ના પ્રોજેક્ટને એક્સેસ આપવાનો નિરાકર કર્યો છે.\n\n**આને સુધારવાની સરળ રીત:**\n1. AI Studio માં ઉપર-જમણે **Settings > Secrets** પર ક્લિક કરો.\n2. ત્યાં નવો અને સક્રિય **GEMINI_API_KEY** ઉમેરો.\n3. સેવ કરતાં જ તમારો **AI મિત્ર** ફરી તરત જવાબ આપવા લાગશે!',
  'app.jokeTitle': 'એક મજાકર જોક',
  'app.shayariTitle': 'એક પ્રિય શાયરી',
  'app.motivationTitle': 'આજનું ઉત્સાહ',
  'app.paheliTitle': 'એક બુદ્ધિનો કોયડો',
  'app.playPrompt': 'મિત્ર, મને {title} સાંભળો!',
  'app.reexplainPrompt': 'મિત્ર, આને વધુ સરળ ભાષામાં એક સાચા ઉદાહરણ સાથે સમજાવો.',
  'app.docPrompt': 'મારું આ દસ્તાવેજ/પરિસ્થિતિ સમજાવો અને માર્ગદર્શન આપો:\n\n{text}',
  'app.exportAssistant': 'મારો AI મિત્ર ({name})',

  // ---------- personas ----------
  'persona.default.name': 'AI મિત્ર (ડિફૉલ્ટ)',
  'persona.default.tagline': 'ગરમીભરેલો, દયાળુ અને સમજતો સાથી',
  'persona.default.desc':
    'સંતુલિત, મિત્રતાપૂર્વક અને સહાનુભૂતિશીલ શૈલી — તમારી ભાષામાં કુદરતી રીતે વાત કરે છે. હંમેશા સન્માનજનક, ખુશમિજાજ અને મદદરૂપ.',
  'persona.default.badge': 'લોકપ્રિય',
  'persona.desi.name': 'દેશી યાર / ઝિગરી દોસ્ટ',
  'persona.desi.tagline': 'રિલેક્સ, મજાકર અને મજાથી ભરેલો',
  'persona.desi.desc':
    'કેઝિયું, ખુશમિજાજ, મજાકર અને વાતચીતવાળી શૈલી — હળવો-ફૂલકો મજાક અને સંપૂર્ણ દેશી સ્વાભાવ.',
  'persona.desi.badge': 'મજા અને રિલેક્સ',
  'persona.bhai.name': 'મોટો ભાઈ / બહેન',
  'persona.bhai.tagline': 'સહાયક ગુરુ અને પ્રામાણિક માર્ગદર્શક',
  'persona.bhai.desc':
    'સમજદાર, દયાળુ મોટા ભાઈ-બહેન જેવી શૈલી — ઠસાઠવાની વ્યાવહારિક સલાહ અને ઊંડી ભાવનાત્મક સહાય.',
  'persona.bhai.badge': 'સમજદાર અને માર્ગદર્શક',
  'persona.pro.name': 'સ્માર્ટ સલાહકાર / કોચ',
  'persona.pro.tagline': 'સુવ્યવસ્થિત, સાફું અને ઉકેલકેન્દ્રિત',
  'persona.pro.desc':
    'સુવ્યવસ્થિત પણ મિત્રતાપૂર્વક વૃત્તિકારી સાથી — ઉત્તમ ઈમેલ, જવાબ અને સ્પષ્ટ સારાંશ બનાવે છે.',
  'persona.pro.badge': 'વૃત્તિકારી',

  // ---------- category info ----------
  'cat.explain.name': 'સમજાવો',
  'cat.explain.desc':
    'બિલ, સૂચના, અઘરા ખ્યાલો, દવાની પત્રિકા કે ફોટો — ભારે જટિલ શબ્દો વગર બહુ જ સરળ શબ્દોમાં સ્પષ્ટીકરણ.',
  'cat.emotional.name': 'મનનો વાત / ઉત્સાહ',
  'cat.emotional.desc':
    'તમારી લાગણી, તણાવ, ખરાબ મન કે દિવસની સફળતા વહેંચો. જાતી વગરનો મિત્ર જે ખરેખર સાંભળે છે અને ઉત્સાહ આપે છે.',
  'cat.advice.name': 'સલાહ / જવાબના સૂચનો',
  'cat.advice.desc':
    'શું જવાબ આપવો કે કઈ નિર્ણય લેવો તે અસ્પષ્ટ લાગે છે? પસંદ કરવા માટે ૨-૩ યોગ્ય વ્યાવહારિક વિકલ્પ મળશે.',
  'cat.fun.name': 'મજા અને મનોરંજન',
  'cat.fun.desc':
    'દેશી જોક, હૃદયને અડતી મજાકર વાર્તાઓ, શાયરી, કોયડા અને હળવી-ફૂલકી વાતચીતથી દિવસ હળવો કરો.',
  'cat.general.name': 'બધું એક મિત્ર',
  'cat.general.desc': 'ગમેતે પણ પૂછો, ગમેતે પણ વહેંચો — તમારો પોતાનો મિત્ર હંમેશા તૈયાર છે.',

  // ---------- quick prompts ----------
  'prompt.bill.title': 'વીજ / મોબાઇલ બિલ સમજાવો',
  'prompt.bill.subtitle': 'ફિક્સ્ડ ચાર્જ, યુનિટ અને સબસિડી શું છે?',
  'prompt.bill.prompt':
    'મારું આ વખતનું વીજનું બિલ વધુ આવ્યું છે. બિલમાં ફિક્સ્ડ ચાર્જ, એનર્જી ચાર્જ અને યુનિટ રેટનો અર્થ સરળ ભાષામાં સમજાવો.',
  'prompt.sip.title': 'SIP અને મ્યુચ્યુઅલ ફંડ શું છે?',
  'prompt.sip.subtitle': 'શરૂઆત કરનારાઓ માટે બહુ સરળ ભાષામાં',
  'prompt.sip.prompt':
    'મ્યુચ્યુઅલ ફંડ અને SIP શું છે? મને દસ વર્ષના બાળક જેવું સરળ ભાષામાં સમજાવો.',
  'prompt.tired.title': 'આજે થોડો થાકેલો / મન ખરાબ છે',
  'prompt.tired.subtitle': 'મન હળવું કરવું છે...',
  'prompt.tired.prompt':
    'મિત્ર, આજનો દિવસ ઘણો ઉધારો-ઉધાર અને તણાવથી ભરાયો. દિમાગ થાકી ગયો છે, થોડી સાકારાત્મક વાત સાંભળવી છે.',
  'prompt.overthink.title': 'ભવિષ્યની ચિંતા અને ઓવર-થિન્કિંગ',
  'prompt.overthink.subtitle': 'મન શાંત કરવાની રીત',
  'prompt.overthink.prompt':
    'હું મારા ભવિષ્ય અને કરિયર વિશે ઘણું વધુ ઓવર-થિન્ક કરું છું. મારું ધ્યાન હવે કેવી રીતે રાખવું તે સમજાવો.',
  'prompt.leave.title': 'બોસને રજા કેવી રીતે માંગવી?',
  'prompt.leave.subtitle': '૨-૩ તૈયાર WhatsApp/ઈમેલ વિકલ્પ',
  'prompt.leave.prompt':
    'મારે કાલે અચાનક અગત્યના કામથી રજા જોઈએ છે. બોસને મોકલવા માટે ૨-૩ વ્યાવહારિક WhatsApp સંદેશ વિકલ્પ બનાવી આપો (નમ્ર, સીધો અને વૃત્તિકારી).',
  'prompt.money.title': 'મિત્રને આપેલા પૈસા કેવી રીતે માંગવા?',
  'prompt.money.subtitle': 'સંબંધ નબરાડ્યા વગર હળવી યાદ અપાવવાના ઉપાય',
  'prompt.money.prompt':
    'મેં કેટલાક મહિના પહેલાં મારા એક મિત્રને થોડા પૈસા આપ્યા હતા. અસ્ત્યાસ્તુ કે ગુસ્સાના વગર, પ્રેમથી યાદ અપાવવાના ૩ સારા વિકલ્પ આપો.',
  'prompt.joke.title': 'એક મજાકર દેશી જોક સાંભળો',
  'prompt.joke.subtitle': 'હાસ્યનો ડોઝ',
  'prompt.joke.prompt':
    'મિત્ર, એક તાજેતરનો અને મજાકર દેશી જોક સાંભળો જે સાંભળીને હાસી આવે!',
  'prompt.shayari.title': 'જીવન પર એક પ્રિય શાયરી',
  'prompt.shayari.subtitle': 'હૃદયને અડતી લાઇનો',
  'prompt.shayari.prompt':
    'જીવન, મિત્રતા કે મહેનત પર એક સુંદર અને હૃદયને અડતી શાયરી સાંભળો.',

  // ---------- sample documents ----------
  'doc.bill.name': 'વીજનું બિલ (નમૂનું બિલ)',
  'doc.bill.desc': 'વીજનો વપરાશ, સ્લેબ અને બાકી દર્શાવતો નમૂનો લખાણ.',
  'doc.kyc.name': 'બેંક KYC સૂચના (નમૂની સૂચના)',
  'doc.kyc.desc': 'બાકી KYC અને ખાતું સ્થગિરિત કરવાની ચેતવણી વિશેની બેંકનો નમૂનો પત્ર.',
  'doc.awkward.name': 'અજીબ WhatsApp ચેટ (જવાબની પરિસ્થિતિ)',
  'doc.awkward.desc': 'એક ઓળખતો વ્યક્તિ વીકએન્ડ દરમિયાન મફતમાં મોટી મદદ માંગે છે.',
};

export default gu;
