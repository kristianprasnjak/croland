/* =====================================================================
   Croland mini-igre — izvorni rječnik (proširena verzija)
   ---------------------------------------------------------------------
   Ovo je IZVOR. Ne čita ga nijedna igra izravno.
   Pokretanjem `node ugradi.js` sadržaj se ugrađuje u svih 12 HTML igara,
   pa svaka ostaje samostalna datoteka bez vanjskih ovisnosti.

   Format retka: [hr, en, rod, emoji]
     rod: 'm' | 'ž' | 's' | '-'  ('-' za glagole, pridjeve, brojeve, priloge)
   ===================================================================== */

var KATEGORIJE = {
  hrana:      { hr: 'Hrana',      en: 'food' },
  pice:       { hr: 'Piće',       en: 'drinks' },
  zivotinja:  { hr: 'Životinje',  en: 'animals' },
  osoba:      { hr: 'Ljudi',      en: 'people' },
  mjesto:     { hr: 'Mjesta',     en: 'places' },
  dom:        { hr: 'Dom',        en: 'home' },
  prijevoz:   { hr: 'Prijevoz',   en: 'transport' },
  predmet:    { hr: 'Predmeti',   en: 'objects' },
  odjeca:     { hr: 'Odjeća',     en: 'clothes' },
  priroda:    { hr: 'Priroda',    en: 'nature' },
  vrijeme:    { hr: 'Vrijeme',    en: 'time' },
  tijelo:     { hr: 'Tijelo',     en: 'body' },
  osjecaj:    { hr: 'Osjećaji',   en: 'feelings' },
  posao:      { hr: 'Zanimanja',  en: 'jobs' },
  tehnika:    { hr: 'Tehnika',    en: 'technology' },
  putovanje:  { hr: 'Putovanje',  en: 'travel' },
  glagol:     { hr: 'Glagoli',    en: 'verbs' },
  pridjev:    { hr: 'Pridjevi',   en: 'adjectives' },
  prilog:     { hr: 'Prilozi',    en: 'adverbs' },
  boja:       { hr: 'Boje',       en: 'colours' },
  broj:       { hr: 'Brojevi',    en: 'numbers' },
  skola:      { hr: 'Škola',      en: 'school' },
  sport:      { hr: 'Sport',      en: 'sport' }
};

var RIJECI = {

hrana: [
  ['jabuka','apple','ž','🍎'], ['banana','banana','ž','🍌'], ['kruh','bread','m','🍞'],
  ['sir','cheese','m','🧀'], ['juha','soup','ž','🍲'], ['salata','salad','ž','🥗'],
  ['riba','fish','ž','🐟'], ['pita','pie','ž','🥧'], ['torta','cake','ž','🎂'],
  ['čokolada','chocolate','ž','🍫'], ['sladoled','ice cream','m','🍦'], ['jaje','egg','s','🥚'],
  ['rajčica','tomato','ž','🍅'], ['luk','onion','m','🧅'], ['palačinke','pancakes','ž','🥞'],
  ['povrće','vegetables','s','🥦'], ['voće','fruit','s','🍇'], ['ananas','pineapple','m','🍍'],
  ['sendvič','sandwich','m','🥪'], ['pizza','pizza','ž','🍕'], ['ćevapi','ćevapi','m','🍢'],
  ['kolač','pastry','m','🧁'], ['šećer','sugar','m','🍬'], ['sol','salt','ž','🧂'],
  ['džem','jam','m','🍓'],
  ['meso','meat','s','🥩'], ['piletina','chicken','ž','🍗'], ['riža','rice','ž','🍚'],
  ['tjestenina','pasta','ž','🍝'], ['krumpir','potato','m','🥔'], ['mrkva','carrot','ž','🥕'],
  ['kruška','pear','ž','🍐'], ['grožđe','grapes','s','🍇'], ['lubenica','watermelon','ž','🍉'],
  ['jagoda','strawberry','ž','🍓'], ['breskva','peach','ž','🍑'], ['trešnja','cherry','ž','🍒'],
  ['limun','lemon','m','🍋'], ['naranča','orange','ž','🍊'], ['maslina','olive','ž','🫒'],
  ['orah','walnut','m','🌰'], ['med','honey','m','🍯'], ['maslac','butter','m','🧈'],
  ['brašno','flour','s','🌾'], ['doručak','breakfast','m','🍳'], ['ručak','lunch','m','🍽'],
  ['večera','dinner','ž','🍲'], ['kobasica','sausage','ž','🌭'], ['šunka','ham','ž','🥓'],
  ['paprika','pepper','ž','🌶'], ['krastavac','cucumber','m','🥒'], ['kupus','cabbage','m','🥬'],
  ['grah','beans','m','🫘'], ['gljiva','mushroom','ž','🍄'], ['bombon','candy','m','🍬'],
  ['keks','biscuit','m','🍪'], ['umak','sauce','m','🥫'], ['češnjak','garlic','m','🧄'],
  ['hrana','food','ž','🍽'], ['obrok','meal','m','🍱'], ['recept','recipe','m','📋']
],

pice: [
  ['kava','coffee','ž','☕'], ['voda','water','ž','💧'], ['sok','juice','m','🧃'],
  ['vino','wine','s','🍷'], ['čaj','tea','m','🍵'], ['mlijeko','milk','s','🥛'],
  ['pivo','beer','s','🍺'], ['limunada','lemonade','ž','🍋'], ['kakao','cocoa','m','🍫'],
  ['šampanjac','champagne','m','🍾'], ['rakija','brandy','ž','🥃'], ['čaša','glass','ž','🥛'],
  ['boca','bottle','ž','🍾'], ['šalica','cup','ž','☕'], ['led','ice','m','🧊'],
  ['napitak','beverage','m','🧋'], ['kapučino','cappuccino','m','☕'], ['čajnik','teapot','m','🫖'],
  ['slamka','straw','ž','🥤'], ['gutljaj','sip','m','💦']
],

zivotinja: [
  ['pas','dog','m','🐕'], ['mačka','cat','ž','🐈'], ['konj','horse','m','🐎'],
  ['lav','lion','m','🦁'], ['zebra','zebra','ž','🦓'], ['žaba','frog','ž','🐸'],
  ['foka','seal','ž','🦭'], ['golub','pigeon','m','🕊'], ['galeb','seagull','m','🐦'],
  ['ptica','bird','ž','🐦'], ['miš','mouse','m','🐁'], ['zec','rabbit','m','🐇'],
  ['medvjed','bear','m','🐻'], ['vuk','wolf','m','🐺'], ['lisica','fox','ž','🦊'],
  ['jelen','deer','m','🦌'], ['krava','cow','ž','🐄'], ['svinja','pig','ž','🐖'],
  ['ovca','sheep','ž','🐑'], ['koza','goat','ž','🐐'], ['kokoš','hen','ž','🐔'],
  ['patka','duck','ž','🦆'], ['guska','goose','ž','🦢'], ['pijetao','rooster','m','🐓'],
  ['slon','elephant','m','🐘'], ['majmun','monkey','m','🐒'], ['tigar','tiger','m','🐅'],
  ['žirafa','giraffe','ž','🦒'], ['krokodil','crocodile','m','🐊'], ['zmija','snake','ž','🐍'],
  ['kornjača','turtle','ž','🐢'], ['puž','snail','m','🐌'], ['pčela','bee','ž','🐝'],
  ['leptir','butterfly','m','🦋'], ['mrav','ant','m','🐜'], ['pauk','spider','m','🕷'],
  ['dupin','dolphin','m','🐬'], ['kit','whale','m','🐋'], ['rak','crab','m','🦀'],
  ['hobotnica','octopus','ž','🐙'], ['sova','owl','ž','🦉'], ['orao','eagle','m','🦅'],
  ['vjeverica','squirrel','ž','🐿'], ['jež','hedgehog','m','🦔'], ['šišmiš','bat','m','🦇'],
  ['janje','lamb','s','🐑'], ['mače','kitten','s','🐱'], ['štene','puppy','s','🐶']
],

osoba: [
  ['mama','mom','ž','👩'], ['tata','dad','m','👨'], ['brat','brother','m','🧑'],
  ['sestra','sister','ž','👧'], ['baka','grandma','ž','👵'], ['djed','grandpa','m','👴'],
  ['dijete','child','s','🧒'], ['dječak','boy','m','👦'], ['djevojčica','girl','ž','👧'],
  ['prijatelj','friend','m','🤝'], ['student','student','m','🎓'], ['profesor','professor','m','👨‍🏫'],
  ['učiteljica','teacher','ž','👩‍🏫'], ['turist','tourist','m','🧳'], ['susjed','neighbour','m','🏘'],
  ['obitelj','family','ž','👨‍👩‍👧'], ['ljudi','people','m','👥'], ['čovjek','man','m','🧍'],
  ['žena','woman','ž','👩'], ['muž','husband','m','🤵'], ['supruga','wife','ž','👰'],
  ['sin','son','m','👦'], ['kći','daughter','ž','👧'], ['teta','aunt','ž','👩‍🦰'],
  ['ujak','uncle','m','🧔'], ['bratić','cousin','m','👬'], ['unuk','grandson','m','🧒'],
  ['roditelji','parents','m','👨‍👩‍👦'], ['prijateljica','friend (f)','ž','👭'], ['kolega','colleague','m','🧑‍💼'],
  ['gost','guest','m','🛎'], ['šef','boss','m','💼'], ['dečko','boyfriend','m','🧑'],
  ['djevojka','girlfriend','ž','👩'], ['gospodin','mister','m','🎩'], ['gospođa','madam','ž','👒'],
  ['mladić','young man','m','🧑'], ['starac','old man','m','👴'], ['skupina','group','ž','👨‍👩‍👧‍👦'],
  ['narod','nation','m','🌍'], ['beba','baby','ž','👶'], ['tinejdžer','teenager','m','🧑‍🎤'],
  ['ime','name','s','🏷'], ['prezime','surname','s','📇'], ['susjeda','neighbour (f)','ž','🏡']
],

mjesto: [
  ['grad','city','m','🏙'], ['kuća','house','ž','🏠'], ['hotel','hotel','m','🏨'],
  ['restoran','restaurant','m','🍽'], ['kafić','café','m','☕'], ['škola','school','ž','🏫'],
  ['tržnica','market','ž','🏪'], ['trgovina','shop','ž','🛒'], ['pošta','post office','ž','📮'],
  ['pekara','bakery','ž','🥖'], ['kazalište','theatre','s','🎭'], ['kino','cinema','s','🎬'],
  ['muzej','museum','m','🏛'], ['galerija','gallery','ž','🖼'], ['katedrala','cathedral','ž','⛪'],
  ['most','bridge','m','🌉'], ['trg','square','m','⛲'], ['ulica','street','ž','🛣'],
  ['stanica','stop','ž','🚏'], ['kolodvor','train station','m','🚉'], ['aerodrom','airport','m','🛫'],
  ['stadion','stadium','m','🏟'], ['apoteka','pharmacy','ž','💊'], ['teretana','gym','ž','🏋'],
  ['biblioteka','library','ž','📚'], ['ured','office','m','🏢'], ['zgrada','building','ž','🏬'],
  ['selo','village','s','🏘'], ['država','country','ž','🗺'], ['bolnica','hospital','ž','🏥'],
  ['banka','bank','ž','🏦'], ['crkva','church','ž','⛪'], ['park','park','m','🌳'],
  ['plaža','beach','ž','🏖'], ['luka','port','ž','⚓'], ['kvart','neighbourhood','m','🏘'],
  ['dvorište','yard','s','🌿'], ['tvornica','factory','ž','🏭'], ['sveučilište','university','s','🎓'],
  ['vrtić','kindergarten','m','🧸'], ['kiosk','kiosk','m','📰'], ['autocesta','motorway','ž','🛣'],
  ['raskrižje','crossroads','s','🚦'], ['parkiralište','car park','s','🅿'], ['dvorana','hall','ž','🏛'],
  ['fontana','fountain','ž','⛲'], ['tunel','tunnel','m','🚇'], ['granica','border','ž','🛂'],
  ['centar','centre','m','📍'], ['akvarij','aquarium','m','🐠'], ['tvrđava','fortress','ž','🏰'],
  ['dvorac','castle','m','🏰'], ['svjetionik','lighthouse','m','🗼'], ['čekaonica','waiting room','ž','🪑'],
  ['tržni centar','shopping centre','m','🏬']
],

dom: [
  ['soba','room','ž','🚪'], ['kuhinja','kitchen','ž','🍳'], ['kupaonica','bathroom','ž','🛁'],
  ['spavaća soba','bedroom','ž','🛏'], ['dnevna soba','living room','ž','🛋'], ['hodnik','hallway','m','🚪'],
  ['stan','flat','m','🏢'], ['vrt','garden','m','🌷'], ['balkon','balcony','m','🪟'],
  ['krov','roof','m','🏠'], ['pod','floor','m','🟫'], ['strop','ceiling','m','⬜'],
  ['zid','wall','m','🧱'], ['vrata','door','s','🚪'], ['prozor','window','m','🪟'],
  ['stol','table','m','🪑'], ['stolica','chair','ž','🪑'], ['krevet','bed','m','🛏'],
  ['ormar','wardrobe','m','🗄'], ['polica','shelf','ž','📚'], ['kauč','sofa','m','🛋'],
  ['tepih','carpet','m','🧶'], ['lampa','lamp','ž','💡'], ['zavjesa','curtain','ž','🪟'],
  ['jastuk','pillow','m','🛏'], ['deka','blanket','ž','🧣'], ['hladnjak','fridge','m','🧊'],
  ['pećnica','oven','ž','🔥'], ['perilica','washing machine','ž','🧺'], ['stepenice','stairs','ž','🪜'],
  ['dizalo','lift','s','🛗'], ['adresa','address','ž','📍'], ['podrum','cellar','m','🕳'],
  ['tavan','attic','m','🪟'], ['garaža','garage','ž','🚗']
],

prijevoz: [
  ['auto','car','m','🚗'], ['autobus','bus','m','🚌'], ['tramvaj','tram','m','🚊'],
  ['vlak','train','m','🚆'], ['taksi','taxi','m','🚕'], ['bicikl','bicycle','m','🚲'],
  ['brod','boat','m','⛵'], ['avion','plane','m','✈'], ['motor','motorbike','m','🏍'],
  ['trajekt','ferry','m','⛴'], ['metro','metro','m','🚇'], ['kamion','truck','m','🚚'],
  ['kombi','van','m','🚐'], ['romobil','scooter','m','🛴'], ['helikopter','helicopter','m','🚁'],
  ['raketa','rocket','ž','🚀'], ['hitna','ambulance','ž','🚑'], ['peron','platform','m','🚉'],
  ['vožnja','ride','ž','🛞'], ['gorivo','fuel','s','⛽'], ['guma','tyre','ž','🛞'],
  ['volan','steering wheel','m','🎛'], ['sidro','anchor','s','⚓'], ['jedro','sail','s','⛵'],
  ['čamac','small boat','m','🛶'], ['kolica','cart','s','🛒']
],

predmet: [
  ['knjiga','book','ž','📕'], ['telefon','telephone','m','📱'], ['slika','picture','ž','🖼'],
  ['kutija','box','ž','📦'], ['tava','pan','ž','🍳'], ['vrećica','bag','ž','🛍'],
  ['novine','newspaper','ž','📰'], ['pismo','letter','s','✉'], ['paket','package','m','📦'],
  ['karta','ticket','ž','🎫'], ['gitara','guitar','ž','🎸'], ['klavir','piano','m','🎹'],
  ['lopta','ball','ž','⚽'], ['fotoaparat','camera','m','📷'], ['igla','needle','ž','🪡'],
  ['poklon','present','m','🎁'], ['udžbenik','textbook','m','📘'], ['ključ','key','m','🗝'],
  ['novčanik','wallet','m','👛'], ['novac','money','m','💵'], ['torba','bag','ž','👜'],
  ['naočale','glasses','ž','👓'], ['ručni sat','wristwatch','m','⌚'], ['kišobran','umbrella','m','☂'],
  ['ogledalo','mirror','s','🪞'], ['češalj','comb','m','🪮'], ['četkica','toothbrush','ž','🪥'],
  ['sapun','soap','m','🧼'], ['ručnik','towel','m','🧻'], ['svijeća','candle','ž','🕯'],
  ['škare','scissors','ž','✂'], ['ljepilo','glue','s','🧴'], ['olovka','pencil','ž','✏'],
  ['kemijska','pen','ž','🖊'], ['papir','paper','m','📄'], ['bilježnica','notebook','ž','📓'],
  ['mapa','folder','ž','📁'], ['kist','brush','m','🖌'], ['nož','knife','m','🔪'],
  ['žlica','spoon','ž','🥄'], ['vilica','fork','ž','🍴'], ['tanjur','plate','m','🍽'],
  ['zdjela','bowl','ž','🥣'], ['metla','broom','ž','🧹'], ['alat','tool','m','🔧'],
  ['čekić','hammer','m','🔨'], ['ljestve','ladder','ž','🪜'], ['uže','rope','s','🪢'],
  ['lanac','chain','m','⛓'], ['zemljovid','map','m','🗺'], ['zastava','flag','ž','🚩'],
  ['balon','balloon','m','🎈'], ['igračka','toy','ž','🧸'], ['kocka','dice','ž','🎲'],
  ['kotač','wheel','m','🛞'], ['baterijska svjetiljka','torch','ž','🔦'], ['ruksak','backpack','m','🎒'],
  ['naljepnica','sticker','ž','🏷'], ['kutlača','ladle','ž','🥄'], ['vaza','vase','ž','🏺']
],

odjeca: [
  ['šešir','hat','m','🎩'], ['cipela','shoe','ž','👞'], ['šal','scarf','m','🧣'],
  ['dres','jersey','m','👕'], ['majica','T-shirt','ž','👕'], ['košulja','shirt','ž','👔'],
  ['hlače','trousers','ž','👖'], ['traperice','jeans','ž','👖'], ['suknja','skirt','ž','👗'],
  ['haljina','dress','ž','👗'], ['jakna','jacket','ž','🧥'], ['kaput','coat','m','🧥'],
  ['džemper','sweater','m','🧶'], ['čarapa','sock','ž','🧦'], ['rukavica','glove','ž','🧤'],
  ['kapa','cap','ž','🧢'], ['tenisice','sneakers','ž','👟'], ['čizma','boot','ž','👢'],
  ['papuča','slipper','ž','🥿'], ['odijelo','suit','s','🤵'], ['kravata','tie','ž','👔'],
  ['pojas','belt','m','🥋'], ['kupaći','swimsuit','m','🩱'], ['pidžama','pyjamas','ž','🛌'],
  ['naušnica','earring','ž','💎'], ['prsten','ring','m','💍'], ['odjeća','clothes','ž','👚'],
  ['veličina','size','ž','📏'], ['džep','pocket','m','👖'], ['gumb','button','m','🔘']
],

priroda: [
  ['cvijeće','flowers','s','💐'], ['more','sea','s','🌊'], ['sunce','sun','s','☀'],
  ['nebo','sky','s','🌤'], ['drvo','tree','s','🌳'], ['rijeka','river','ž','🏞'],
  ['kiša','rain','ž','🌧'], ['zvijezda','star','ž','⭐'], ['otok','island','m','🏝'],
  ['planina','mountain','ž','🏔'], ['brdo','hill','s','⛰'], ['šuma','forest','ž','🌲'],
  ['jezero','lake','s','🏞'], ['polje','field','s','🌾'], ['livada','meadow','ž','🌿'],
  ['cvijet','flower','m','🌸'], ['list','leaf','m','🍃'], ['trava','grass','ž','🌱'],
  ['grana','branch','ž','🌿'], ['korijen','root','m','🌱'], ['oblak','cloud','m','☁'],
  ['vjetar','wind','m','💨'], ['snijeg','snow','m','❄'], ['munja','lightning','ž','⚡'],
  ['grom','thunder','m','🌩'], ['magla','fog','ž','🌫'], ['duga','rainbow','ž','🌈'],
  ['val','wave','m','🌊'], ['pijesak','sand','m','🏖'], ['kamen','stone','m','🪨'],
  ['zemlja','earth','ž','🌍'], ['vatra','fire','ž','🔥'], ['zrak','air','m','💨'],
  ['priroda','nature','ž','🌿'], ['špilja','cave','ž','🕳'], ['slap','waterfall','m','💦'],
  ['izvor','spring','m','⛲'], ['dolina','valley','ž','🏞'], ['obala','coast','ž','🏝'],
  ['biljka','plant','ž','🪴'], ['sjeme','seed','s','🌰'], ['školjka','shell','ž','🐚'],
  ['koralj','coral','m','🪸'], ['ruža','rose','ž','🌹'], ['potok','stream','m','🏞']
],

vrijeme: [
  ['zima','winter','ž','❄'], ['ljeto','summer','s','🏖'], ['proljeće','spring','s','🌷'],
  ['jesen','autumn','ž','🍂'], ['dan','day','m','📅'], ['jutro','morning','s','🌅'],
  ['večer','evening','ž','🌆'], ['noć','night','ž','🌙'], ['podne','noon','s','🕛'],
  ['ponoć','midnight','ž','🕛'], ['sat','hour','m','🕐'], ['minuta','minute','ž','⏱'],
  ['sekunda','second','ž','⏲'], ['godina','year','ž','📆'], ['mjesec','month','m','🗓'],
  ['tjedan','week','m','🗓'], ['vikend','weekend','m','🎉'], ['ponedjeljak','Monday','m','📅'],
  ['utorak','Tuesday','m','📅'], ['srijeda','Wednesday','ž','📅'], ['četvrtak','Thursday','m','📅'],
  ['petak','Friday','m','📅'], ['subota','Saturday','ž','📅'], ['nedjelja','Sunday','ž','📅'],
  ['siječanj','January','m','🗓'], ['travanj','April','m','🗓'], ['srpanj','July','m','🗓'],
  ['listopad','October','m','🗓'], ['prosinac','December','m','🗓'], ['rođendan','birthday','m','🎂'],
  ['praznik','holiday','m','🎊'], ['odmor','rest','m','🏖'], ['datum','date','m','📆'],
  ['raspored','schedule','m','📋'], ['zora','dawn','ž','🌅'], ['sumrak','dusk','m','🌇'],
  ['trenutak','moment','m','⏳'], ['budućnost','future','ž','🔮'], ['prošlost','past','ž','📜'],
  ['stoljeće','century','s','🏛']
],

tijelo: [
  ['nos','nose','m','👃'], ['oko','eye','s','👁'], ['uho','ear','s','👂'],
  ['glava','head','ž','🗣'], ['kosa','hair','ž','💇'], ['lice','face','s','🙂'],
  ['usta','mouth','s','👄'], ['zub','tooth','m','🦷'], ['jezik','tongue','m','👅'],
  ['vrat','neck','m','🧣'], ['rame','shoulder','s','💪'], ['ruka','hand','ž','✋'],
  ['prst','finger','m','👆'], ['noga','leg','ž','🦵'], ['stopalo','foot','s','🦶'],
  ['koljeno','knee','s','🦵'], ['leđa','back','s','🔙'], ['trbuh','belly','m','🫃'],
  ['srce','heart','s','❤'], ['mozak','brain','m','🧠'], ['krv','blood','ž','🩸'],
  ['kost','bone','ž','🦴'], ['koža','skin','ž','🧴'], ['mišić','muscle','m','💪'],
  ['pluća','lungs','s','🫁'], ['grlo','throat','s','🗣'], ['obrva','eyebrow','ž','👁'],
  ['brada','chin','ž','🧔'], ['tijelo','body','s','🧍'], ['zdravlje','health','s','💚']
],

osjecaj: [
  ['ljubav','love','ž','❤'], ['sreća','happiness','ž','😊'], ['tuga','sadness','ž','😢'],
  ['strah','fear','m','😨'], ['ljutnja','anger','ž','😠'], ['radost','joy','ž','🎉'],
  ['briga','worry','ž','😟'], ['nada','hope','ž','✨'], ['želja','wish','ž','💫'],
  ['osjećaj','feeling','m','💭'], ['misao','thought','ž','🤔'], ['san','dream','m','💤'],
  ['umor','tiredness','m','🥱'], ['dosada','boredom','ž','😑'], ['iznenađenje','surprise','s','😲'],
  ['ponos','pride','m','🦚'], ['sram','shame','m','😳'], ['hrabrost','courage','ž','🦁'],
  ['mir','peace','m','🕊'], ['smijeh','laughter','m','😂'], ['suza','tear','ž','💧'],
  ['zagrljaj','hug','m','🤗'], ['poljubac','kiss','m','💋'], ['prijateljstvo','friendship','s','🤝'],
  ['strpljenje','patience','s','⏳']
],

posao: [
  ['posao','job','m','💼'], ['pekar','baker','m','🥖'], ['kuhar','cook','m','👨‍🍳'],
  ['konobar','waiter','m','🧑‍🍳'], ['vozač','driver','m','🚌'], ['doktor','doctor','m','🩺'],
  ['medicinska sestra','nurse','ž','👩‍⚕'], ['inženjer','engineer','m','👷'], ['programer','programmer','m','💻'],
  ['novinar','journalist','m','📰'], ['glumac','actor','m','🎭'], ['pjevač','singer','m','🎤'],
  ['slikar','painter','m','🎨'], ['pisac','writer','m','✍'], ['odvjetnik','lawyer','m','⚖'],
  ['frizer','hairdresser','m','💇'], ['prodavač','shop assistant','m','🛍'], ['vatrogasac','firefighter','m','🚒'],
  ['mehaničar','mechanic','m','🔧'], ['seljak','farmer','m','🚜'], ['ribar','fisherman','m','🎣'],
  ['arhitekt','architect','m','📐'], ['znanstvenik','scientist','m','🔬'], ['vojnik','soldier','m','🎖'],
  ['pilot','pilot','m','🧑‍✈'], ['kapetan','captain','m','⚓'], ['policajac','police officer','m','👮'],
  ['poštar','postman','m','📬'], ['plaća','salary','ž','💶'], ['sastanak','meeting','m','🗓'],
  ['ugovor','contract','m','📄']
],

tehnika: [
  ['računalo','computer','s','💻'], ['mobitel','mobile phone','m','📱'], ['ekran','screen','m','🖥'],
  ['tipkovnica','keyboard','ž','⌨'], ['računalni miš','computer mouse','m','🖱'], ['internet','internet','m','🌐'],
  ['lozinka','password','ž','🔑'], ['poruka','message','ž','💬'], ['e-pošta','e-mail','ž','📧'],
  ['aplikacija','app','ž','📲'], ['igrica','video game','ž','🎮'], ['televizor','television','m','📺'],
  ['radio','radio','m','📻'], ['slušalice','headphones','ž','🎧'], ['zvučnik','speaker','m','🔊'],
  ['kamera','camera','ž','🎥'], ['punjač','charger','m','🔌'], ['baterija','battery','ž','🔋'],
  ['tipka','button','ž','🔘'], ['datoteka','file','ž','📄'], ['video','video','m','🎬'],
  ['snimka','recording','ž','⏺'], ['struja','electricity','ž','⚡']
],

putovanje: [
  ['put','trip','m','🧭'], ['putovnica','passport','ž','🛂'], ['prtljaga','luggage','ž','🧳'],
  ['kofer','suitcase','m','🧳'], ['rezervacija','reservation','ž','📅'], ['smještaj','accommodation','m','🏨'],
  ['recepcija','reception','ž','🛎'], ['vodič','guide','m','🧭'], ['izlet','excursion','m','🚌'],
  ['razgledavanje','sightseeing','s','👀'], ['suvenir','souvenir','m','🎁'], ['kamp','camp','m','⛺'],
  ['šator','tent','m','⛺'], ['plan','plan','m','🗺'], ['odredište','destination','s','📍'],
  ['polazak','departure','m','🛫'], ['dolazak','arrival','m','🛬'], ['kašnjenje','delay','s','⏰'],
  ['viza','visa','ž','📘'], ['osiguranje','insurance','s','🛡'], ['razglednica','postcard','ž','📮'],
  ['fotografija','photograph','ž','📸'], ['avantura','adventure','ž','🧗'], ['prijevod','translation','m','🔤']
],

glagol: [
  ['čitati','to read','-','📖'], ['pisati','to write','-','✍'], ['raditi','to work','-','🛠'],
  ['učiti','to study','-','📚'], ['piti','to drink','-','🥤'], ['jesti','to eat','-','🍽'],
  ['gledati','to watch','-','👀'], ['slušati','to listen','-','🎧'], ['spavati','to sleep','-','😴'],
  ['kuhati','to cook','-','🍳'], ['pjevati','to sing','-','🎤'], ['igrati','to play','-','🎮'],
  ['svirati','to play music','-','🎼'], ['plivati','to swim','-','🏊'], ['trčati','to run','-','🏃'],
  ['hodati','to walk','-','🚶'], ['putovati','to travel','-','🧭'], ['voziti','to drive','-','🚙'],
  ['čekati','to wait','-','⏳'], ['vidjeti','to see','-','👁'], ['kupovati','to buy','-','🛒'],
  ['slati','to send','-','📤'], ['nositi','to carry','-','🎒'], ['živjeti','to live','-','🌱'],
  ['znati','to know','-','💡'], ['imati','to have','-','🤲'], ['misliti','to think','-','🤔'],
  ['birati','to choose','-','🔀'], ['naručiti','to order','-','📋'], ['sjediti','to sit','-','🪑'],
  ['govoriti','to speak','-','🗣'], ['razumjeti','to understand','-','🧩'], ['pitati','to ask','-','❓'],
  ['odgovoriti','to answer','-','💬'], ['otvoriti','to open','-','🔓'], ['zatvoriti','to close','-','🔒'],
  ['uzeti','to take','-','🤏'], ['dati','to give','-','🎁'], ['staviti','to put','-','📥'],
  ['tražiti','to look for','-','🔎'], ['naći','to find','-','🎯'], ['izgubiti','to lose','-','😞'],
  ['pomoći','to help','-','🤝'], ['prodati','to sell','-','🏷'], ['platiti','to pay','-','💳'],
  ['štedjeti','to save','-','🐖'], ['voljeti','to love','-','❤'], ['htjeti','to want','-','🙋'],
  ['moći','to be able','-','💪'], ['morati','to have to','-','⚠'], ['trebati','to need','-','📌'],
  ['početi','to start','-','▶'], ['završiti','to finish','-','⏹'], ['nastaviti','to continue','-','⏩'],
  ['stati','to stop','-','⏸'], ['doći','to come','-','🚪'], ['otići','to leave','-','🚶'],
  ['vratiti se','to return','-','🔄'], ['ustati','to get up','-','🛌'], ['oprati','to wash','-','🧼'],
  ['očistiti','to clean','-','🧹'], ['peći','to bake','-','🔥'], ['rezati','to cut','-','🔪'],
  ['graditi','to build','-','🏗'], ['popraviti','to fix','-','🔧'], ['crtati','to draw','-','✏'],
  ['plesati','to dance','-','💃'], ['smijati se','to laugh','-','😂'], ['plakati','to cry','-','😢'],
  ['vikati','to shout','-','📢'], ['šutjeti','to be silent','-','🤫'], ['zvati','to call','-','☎'],
  ['prevoditi','to translate','-','🔤'], ['ponoviti','to repeat','-','🔁'], ['zapamtiti','to memorise','-','🧠'],
  ['zaboraviti','to forget','-','🌀'], ['vjerovati','to believe','-','🙏'], ['nadati se','to hope','-','✨'],
  ['bojati se','to be afraid','-','😨'], ['odmarati','to rest','-','😌'], ['šetati','to stroll','-','🚶'],
  ['penjati se','to climb','-','🧗'], ['skakati','to jump','-','🤸'], ['letjeti','to fly','-','🕊'],
  ['padati','to fall','-','🍂'], ['čuvati','to guard','-','🛡'], ['slaviti','to celebrate','-','🥳'],
  ['pozvati','to invite','-','💌'], ['upoznati','to meet','-','🤝'], ['pripremiti','to prepare','-','🍳'],
  ['mjeriti','to measure','-','📏'], ['brojati','to count','-','🔢'], ['sanjati','to dream','-','💤'],
  ['probuditi se','to wake up','-','⏰'], ['obući se','to get dressed','-','👕'], ['kupati se','to bathe','-','🛁'],
  ['odlučiti','to decide','-','⚖'], ['pokušati','to try','-','🎯'], ['uspjeti','to succeed','-','🏆']
],

pridjev: [
  ['velik','big','-','🔷'], ['mali','small','-','🔹'], ['nov','new','-','✨'],
  ['star','old','-','🏺'], ['dobar','good','-','👍'], ['lijep','beautiful','-','🌸'],
  ['topao','warm','-','🔥'], ['hladan','cold','-','🧊'], ['brz','fast','-','💨'],
  ['spor','slow','-','🐌'], ['sladak','sweet','-','🍯'], ['skup','expensive','-','💰'],
  ['svjež','fresh','-','🌿'], ['gladan','hungry','-','😋'], ['umoran','tired','-','🥱'],
  ['sretan','happy','-','😊'], ['jak','strong','-','💪'], ['visok','tall','-','📏'],
  ['dug','long','-','📐'], ['težak','heavy','-','🏋'], ['zdrav','healthy','-','🥕'],
  ['ukusan','tasty','-','😍'], ['zanimljiv','interesting','-','🧐'], ['smiješan','funny','-','😄'],
  ['loš','bad','-','👎'], ['ružan','ugly','-','🥀'], ['jeftin','cheap','-','🏷'],
  ['kratak','short','-','📏'], ['nizak','low','-','📉'], ['širok','wide','-','↔'],
  ['uzak','narrow','-','↕'], ['debeo','thick','-','🧱'], ['tanak','thin','-','📄'],
  ['pun','full','-','🈵'], ['prazan','empty','-','🈳'], ['čist','clean','-','✨'],
  ['prljav','dirty','-','🧽'], ['mokar','wet','-','💧'], ['suh','dry','-','🏜'],
  ['glasan','loud','-','🔊'], ['tih','quiet','-','🔇'], ['svijetao','bright','-','💡'],
  ['taman','dark','-','🌑'], ['mek','soft','-','🧸'], ['tvrd','hard','-','🪨'],
  ['lagan','light','-','🪶'], ['bogat','rich','-','💰'], ['siromašan','poor','-','🪙'],
  ['mlad','young','-','🌱'], ['pametan','smart','-','🧠'], ['ljubazan','kind','-','🫶'],
  ['strog','strict','-','📏'], ['hrabar','brave','-','🦁'], ['tužan','sad','-','😢'],
  ['ljut','angry','-','😠'], ['miran','calm','-','😌'], ['zauzet','busy','-','📅'],
  ['slobodan','free','-','🕊'], ['spreman','ready','-','✅'], ['važan','important','-','⭐'],
  ['lak','easy','-','🙂'], ['poznat','famous','-','🌟'], ['čudan','strange','-','🌀'],
  ['običan','ordinary','-','📎'], ['poseban','special','-','💫'], ['sličan','similar','-','👯'],
  ['različit','different','-','🔀'], ['siguran','safe','-','🛡'], ['opasan','dangerous','-','⚠'],
  ['koristan','useful','-','🛠'], ['dosadan','boring','-','😑'], ['oštar','sharp','-','🔪'],
  ['gorak','bitter','-','😖'], ['kiseo','sour','-','🍋'], ['slan','salty','-','🧂'],
  ['pikantan','spicy','-','🌶'], ['vruć','hot','-','🥵'], ['bolestan','ill','-','🤒']
],

prilog: [
  ['danas','today','-','📅'], ['sutra','tomorrow','-','⏭'], ['jučer','yesterday','-','⏮'],
  ['sada','now','-','⏰'], ['uvijek','always','-','♾'], ['nikad','never','-','🚫'],
  ['često','often','-','🔁'], ['ponekad','sometimes','-','🤷'], ['rano','early','-','🐓'],
  ['kasno','late','-','🐢'], ['brzo','quickly','-','💨'], ['polako','slowly','-','🐌'],
  ['ovdje','here','-','📍'], ['tamo','there','-','📌'], ['gore','up','-','⬆'],
  ['dolje','down','-','⬇'], ['lijevo','left','-','⬅'], ['desno','right','-','➡'],
  ['blizu','near','-','🔍'], ['daleko','far','-','🔭'], ['zajedno','together','-','👥'],
  ['možda','maybe','-','🤔'], ['također','also','-','➕'], ['jako','very','-','‼'],
  ['malo','a little','-','🤏'], ['puno','a lot','-','🧺'], ['odmah','right away','-','⚡'],
  ['nikamo','nowhere','-','🚷']
],

boja: [
  ['crven','red','-','🔴'], ['plav','blue','-','🔵'], ['žut','yellow','-','🟡'],
  ['zelen','green','-','🟢'], ['bijel','white','-','⚪'], ['crn','black','-','⚫'],
  ['siv','grey','-','🩶'], ['smeđ','brown','-','🟤'], ['narančast','orange','-','🟠'],
  ['ružičast','pink','-','🩷'], ['ljubičast','purple','-','🟣'], ['zlatan','golden','-','🟨'],
  ['srebrn','silver','-','⚙'], ['šaren','colourful','-','🌈']
],

broj: [
  ['jedan','one','-','1️⃣'], ['dva','two','-','2️⃣'], ['tri','three','-','3️⃣'],
  ['četiri','four','-','4️⃣'], ['pet','five','-','5️⃣'], ['šest','six','-','6️⃣'],
  ['sedam','seven','-','7️⃣'], ['osam','eight','-','8️⃣'], ['devet','nine','-','9️⃣'],
  ['deset','ten','-','🔟'], ['jedanaest','eleven','-','1️⃣'], ['dvanaest','twelve','-','1️⃣'],
  ['trinaest','thirteen','-','1️⃣'], ['petnaest','fifteen','-','1️⃣'], ['dvadeset','twenty','-','2️⃣'],
  ['trideset','thirty','-','3️⃣'], ['pedeset','fifty','-','5️⃣'], ['sto','hundred','-','💯'],
  ['tisuću','thousand','-','🔢'], ['nula','zero','-','0️⃣'], ['prvi','first','-','🥇'],
  ['drugi','second','-','🥈'], ['treći','third','-','🥉'], ['pola','half','-','➗'],
  ['par','pair','-','👯']
],

skola: [
  ['matematika','mathematics','ž','➗'], ['geografija','geography','ž','🗺'], ['biologija','biology','ž','🧬'],
  ['fizika','physics','ž','🧲'], ['kemija','chemistry','ž','⚗'], ['povijest','history','ž','🏺'],
  ['književnost','literature','ž','📖'], ['informatika','IT','ž','💻'], ['ispit','exam','m','📝'],
  ['lekcija','lesson','ž','📗'], ['pauza','break','ž','⏸'], ['zadaća','homework','ž','📝'],
  ['pjesma','song','ž','🎵'], ['priča','story','ž','📜'], ['jezik','language','m','🗣'],
  ['razred','class','m','🏫'], ['učionica','classroom','ž','🚪'], ['ploča','board','ž','🧑‍🏫'],
  ['kreda','chalk','ž','🖍'], ['ocjena','grade','ž','🔢'], ['diploma','diploma','ž','📜'],
  ['predavanje','lecture','s','🎓'], ['vježba','exercise','ž','🏋'], ['rječnik','dictionary','m','📔'],
  ['riječ','word','ž','🔤'], ['slovo','letter','s','🔡'], ['rečenica','sentence','ž','📝'],
  ['pitanje','question','s','❓'], ['odgovor','answer','m','💬'], ['greška','mistake','ž','❌'],
  ['znanje','knowledge','s','🧠'], ['učenik','pupil','m','🎒'], ['raspust','school holiday','m','🎒'],
  ['projekt','project','m','📊']
],

sport: [
  ['nogomet','football','m','⚽'], ['tenis','tennis','m','🎾'], ['šah','chess','m','♟'],
  ['joga','yoga','ž','🧘'], ['utakmica','match','ž','🏆'], ['gol','goal','m','🥅'],
  ['trener','coach','m','📣'], ['klub','club','m','🏅'], ['košarka','basketball','ž','🏀'],
  ['rukomet','handball','m','🤾'], ['odbojka','volleyball','ž','🏐'], ['plivanje','swimming','s','🏊'],
  ['trčanje','running','s','🏃'], ['biciklizam','cycling','m','🚴'], ['skijanje','skiing','s','🎿'],
  ['ronjenje','diving','s','🤿'], ['planinarenje','hiking','s','🥾'], ['igrač','player','m','🧑'],
  ['sudac','referee','m','🧑‍⚖'], ['navijač','fan','m','📣'], ['medalja','medal','ž','🥇'],
  ['pobjeda','victory','ž','🏆'], ['poraz','defeat','m','😞'], ['rezultat','result','m','📊'],
  ['teren','pitch','m','🏟'], ['mreža','net','ž','🥅'], ['trening','training','m','💪']
]

};

if (typeof module !== 'undefined') module.exports = { KATEGORIJE: KATEGORIJE, RIJECI: RIJECI };
