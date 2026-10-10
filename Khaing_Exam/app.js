const $=id=>document.getElementById(id);
const sections=[{key:"p1",name:"Part 1 · Meaning, blanks & conversation",label:"PART 1"},{key:"p2",name:"Part 2 · Translation & sentence order",label:"PART 2"},{key:"p3",name:"Part 3 · Reading",label:"PART 3"}];
const q1=[
["tóuténg","ခေါင်းကိုက်ခြင်း",["သွားကိုက်ခြင်း","ချောင်းဆိုးခြင်း","ဖျားခြင်း"]],
["zhěntóu","ခေါင်းအုံး",["စောင်","ခရီးဆောင်အိတ်","ဓာတ်လှေကား"]],
["liú bítì","နှာရည်ယိုခြင်း",["လည်ချောင်းနာခြင်း","မူးဝေခြင်း","ပိုးမွှားကိုက်ခြင်း"]],
["dìngfáng","အခန်းကြိုတင်မှာသည်",["အခန်းမှ check-out လုပ်သည်","ငွေရှင်းသည်","တံခါးဖွင့်သည်"]],
["yóuyǒng","ရေကူးသည်",["ပြေးသည်","ကသည်","သီချင်းဆိုသည်"]],
["gōngyù","တိုက်ခန်း",["လေဆိပ်","ဆေးရုံ","စာသင်ခန်း"]],
["diàntī","ဓာတ်လှေကား",["လှေကား","အိပ်ခန်း","ဥယျာဉ်"]],
["jiéhūn","လက်ထပ်သည်",["လမ်းခွဲသည်","ချိန်းတွေ့သည်","လေးစားအားကျသည်"]],
["cháoshī","စိုထိုင်းသည်",["အေးခဲသည်","နွေးသည်","ခြောက်သွေ့သည်"]],
["zhuànqián","ပိုက်ဆံရှာသည်",["ပိုက်ဆံသုံးသည်","ပိုက်ဆံချေးသည်","ငွေလဲသည်"]]
];
const blanks=[
["Wǒ měitiān zǎoshang ____ zǎocān.","chī",["hē","kàn","dǎ"]],
["Jīntiān tiānqì hěn rè, wǒ xiǎng hē ____.","shuǐ",["chuáng","shū","yīfu"]],
["Tā bù shūfu, yīnwèi tā ____ le.","fāshāo",["gānjìng","mǎn","piàoliang"]],
["Wǒmen qù ____ kàn diànyǐng.","diànyǐngyuàn",["yīyuàn","jiàoshì","chúfáng"]],
["Wǒ měitiān zuò gōnggòng qìchē qù ____.","shàngbān",["shuìjiào","xǐzǎo","chànggē"]],
["Qǐng bǎ shū fàng zài zhuōzi ____.","shàngmiàn",["zuótiān","yīnwèi","yǒudiǎn"]],
["Xià yǔ le, bié wàng le dài ____.","yǔsǎn",["kuàizi","zhěntóu","diànnǎo"]],
["Wǒ xiǎng dìng yí ge ____ fáng.","dānrén",["hóngsè","yǒuyǒng","liúxíng"]],
["Tā měitiān wǎnshang shí diǎn ____ jiào.","shuì",["chī","mǎi","kāi"]],
["Zhè jiàn yīfu tài dà le, yǒu méi yǒu xiǎo yì ____.","jiàn",["běn","zhāng","bēi"]]
];
const conv=[
["A: Xièxie nǐ. B: ____","Bú kèqi.",["Duìbuqǐ.","Zàijiàn.","Méi guānxi."]],
["A: Nǐ jiào shénme míngzi? B: ____","Wǒ jiào Lǐ Míng.",["Wǒ shí èr suì.","Wǒ zài jiā.","Wǒ hěn máng."]],
["A: Nǐ hǎo ma? B: ____","Wǒ hěn hǎo, xièxie.",["Wǒ jiào Wáng Lì.","Wǒ qù chāoshì.","Shí diǎn zhōng."]],
["A: Xiànzài jǐ diǎn? B: ____","Bā diǎn bàn.",["Wǒ shí suì.","Wǒ zài jiā.","Wǒ xǐhuan chá."]],
["A: Nǐ xiǎng chī shénme? B: ____","Wǒ xiǎng chī miàntiáo.",["Wǒ qù xuéxiào.","Wǒ jiào Lǐ Lì.","Jīntiān xīngqīliù."]],
["A: Zhège duōshǎo qián? B: ____","Sānshí kuài.",["Wǒ hěn máng.","Zài zuǒbiān.","Míngtiān qù."]],
["A: Nǐ zěnme qù gōngsī? B: ____","Wǒ zuò dìtiě qù.",["Wǒ shì lǎoshī.","Wǒ è le.","Wǒ xǐhuan hóngsè."]],
["A: Nǐ wèishénme méi lái? B: ____","Yīnwèi wǒ bìng le.",["Wǒ jiào Xiǎo Míng.","Zài zhuōzi shàng.","Liǎng běn shū."]],
["A: Zhōumò nǐ zuò shénme? B: ____","Wǒ chángcháng qù yùndòng.",["Wǒ shíwǔ suì.","Zài fángjiān lǐ.","Hěn piàoliang."]],
["A: Qǐngwèn, yīyuàn zài nǎlǐ? B: ____","Zài chāoshì duìmiàn.",["Wǒ bù chī yú.","Míngtiān hěn lěng.","Wǒ shì xuésheng."]]
];
const p1=[
...q1.map(a=>({type:"mc",kind:"စကားလုံးအဓိပ္ပာယ်",prompt:`“${a[0]}” ၏ မြန်မာအဓိပ္ပာယ်ကို ရွေးပါ။`,options:[a[1],...a[2]],answer:a[1],marks:1})),
...blanks.map(a=>({type:"mc",kind:"ကွက်လပ်ဖြည့်",prompt:a[0],options:[a[1],...a[2]],answer:a[1],marks:1})),
...conv.map(a=>({type:"mc",kind:"စကားပြောအဖြေရွေးချယ်ခြင်း",prompt:a[0],options:[a[1],...a[2]],answer:a[1],marks:1}))
];
const trans=[
["ကျွန်တော် ပန်းသီးတစ်လုံး စားချင်ပါတယ်။","Wǒ xiǎng chī yí ge píngguǒ."],
["ကျွန်မ မနက်တိုင်း ခုနစ်နာရီမှာ အိပ်ရာထတယ်။","Wǒ měitiān zǎoshang qī diǎn qǐchuáng."],
["ကျွန်တော့်အိမ်က ကျောင်းနဲ့ နီးတယ်။","Wǒ jiā lí xuéxiào hěn jìn."],
["မနေ့က မိုးရွာလို့ အပြင်မထွက်ခဲ့ဘူး။","Zuótiān yīnwèi xiàyǔ, suǒyǐ wǒ méi chūqù."],
["ဒီဟိုတယ်မှာ အခန်းတစ်ခန်း ကြိုတင်မှာချင်ပါတယ်။","Wǒ xiǎng dìng yí ge fángjiān."],
["ကျွန်မ တရုတ်စကား နည်းနည်းပြောတတ်တယ်။","Wǒ huì shuō yìdiǎn Zhōngwén."],
["သူမ နေ့တိုင်း ဘတ်စ်ကားနဲ့ အလုပ်သွားတယ်။","Tā měitiān zuò gōnggòng qìchē qù shàngbān."],
["ကျေးဇူးပြုပြီး ဒီစာကြောင်းကို ဖြည်းဖြည်းပြောပါ။","Qǐng nǐ màn yìdiǎn shuō zhè jù huà."],
["ကျွန်တော်တို့ စနေနေ့မှာ ရုပ်ရှင်ကြည့်မယ်။","Wǒmen xīngqīliù qù kàn diànyǐng."],
["ဆရာက ကျွန်မတို့ကို စာအုပ်ဖတ်ဖို့ ပြောတယ်။","Lǎoshī ràng wǒmen dú shū."],
["ကျွန်တော် ဗိုက်ဆာနေပြီ၊ စားသောက်ဆိုင်သွားရအောင်။","Wǒ è le, wǒmen qù fàndiàn ba."],
["ဘဏ်က စူပါမားကတ်ရဲ့ ဘေးမှာရှိတယ်။","Yínháng zài chāoshì pángbiān."],
["မင်း အားကစားလုပ်ရတာ ကြိုက်လား။","Nǐ xǐhuan yùndòng ma?"],
["ဒီနေ့ အရမ်းအေးတယ်၊ အင်္ကျီဝတ်ထားပါ။","Jīntiān hěn lěng, duō chuān yì jiàn yīfu."],
["သူ့မွေးနေ့အတွက် လက်ဆောင်ဝယ်ပေးမယ်။","Wǒ gěi tā mǎi shēngrì lǐwù."]
];
const arrangements=[
["I want to buy two bottles of water.",["wǒ xiǎng","mǎi","liǎng píng","shuǐ"]],
["My older sister is taller than me.",["jiějie","bǐ","wǒ","gāo"]],
["Please wait for me at the bus stop.",["qǐng","zài","chēzhàn","děng wǒ"]],
["I went to the library yesterday.",["wǒ","zuótiān","qù le","túshūguǎn"]],
["Because I was busy, I did not go.",["yīnwèi","wǒ hěn máng","suǒyǐ","méi qù"]],
["She is reading a book in her room.",["tā","zài fángjiān lǐ","kàn","shū"]],
["Please tell me your phone number.",["qǐng","gàosu wǒ","nǐ de","diànhuà hàomǎ"]],
["Although he is young, he is very capable.",["suīrán","tā niánqīng","dànshì","tā hěn nénggàn"]],
["After class, we went to drink tea.",["xiàkè yǐhòu","wǒmen","qù","hē chá"]],
["I usually exercise after dinner.",["wǒ","wǎnfàn hòu","chángcháng","yùndòng"]],
["The train will arrive at nine.",["huǒchē","jiǔ diǎn","huì","dào"]],
["My friend taught me to cook.",["wǒ péngyou","jiāo wǒ","zuòfàn","le"]],
["I have lived here for two years.",["wǒ","zhù zài zhèlǐ","liǎng nián","le"]],
["It is raining outside, so don't go out.",["wàimiàn","xiàyǔ le","suǒyǐ","bié chūqù"]],
["What time do you finish work?",["nǐ","shénme shíhou","xiàbān","jǐ diǎn"]]
];
const p2=[
...trans.map(([prompt,answer])=>({type:"tiles",kind:"မြန်မာမှ Pinyin သို့",prompt,tiles:answer.replace(/[.?!,]/g,"").split(" "),answer:answer.replace(/[.?!,]/g,"").split(" "),marks:1})),
...arrangements.map(([prompt,answer])=>({type:"tiles",kind:"ဝါကျအစီအစဉ်ပြန်စီပါ",prompt:"ဝါကျကို မှန်ကန်သောအစီအစဉ်ဖြင့် ပြန်စီပါ။ "+prompt,tiles:answer,answer,marks:1}))
];
const reading=[
["နေ့စဉ်ဘဝ","Wáng Lì měitiān qī diǎn qǐchuáng. Tā zài jiā chī zǎocān, ránhòu zuò dìtiě qù gōngsī. Tā wǔ diǎn bàn xiàbān, huí jiā yǐhòu chángcháng zuòfàn.","Wáng Lì အလုပ်သို့ ဘာစီးသွားသလဲ။",["မြေအောက်ရထား","တက္ကစီ","စက်ဘီး","ရထား"],"မြေအောက်ရထား"],
["လက်ဆောင်ဝယ်ခြင်း","Míngmíng xiǎng gěi māma mǎi shēngrì lǐwù. Tā kànjiàn yí ge piàoliang de bāo. Bāo yǒudiǎn guì, dàn tā juéde māma huì xǐhuan.","Míngmíng က ဘာကြောင့် အိတ်ကို ဝယ်သလဲ။",["အမေကြိုက်မယ်လို့ ထင်လို့","ဈေးအပေါဆုံးဖြစ်လို့","သူငယ်ချင်းက တောင်းလို့","ကျောင်းအိတ်လိုလို့"],"အမေကြိုက်မယ်လို့ ထင်လို့"],
["ရာသီဥတု","Xiǎo Yǔ hé tóngxué qù páshān. Dào le shāndǐng yǐhòu, tiān tūrán biàn yīn le, hái kāishǐ xiàyǔ.","တောင်ထိပ်ရောက်ပြီးနောက် ဘာဖြစ်သလဲ။",["မိုးစရွာသည်","အရမ်းပူလာသည်","နေ့လယ်စာစားသည်","ညအိပ်သည်"],"မိုးစရွာသည်"],
["တရုတ်စာလေ့လာခြင်း","Ānna xué Hànyǔ liǎng nián le. Tā měitiān tīng Zhōngwén, kàn wénzhāng, yě gēn péngyou liànxí shuōhuà.","Anna က စကားပြောလေ့ကျင့်ဖို့ ဘာလုပ်သလဲ။",["သူငယ်ချင်းနှင့် လေ့ကျင့်သည်","စာဖတ်ရုံသာလုပ်သည်","ဆေးရုံသွားသည်","အားကစားကြည့်သည်"],"သူငယ်ချင်းနှင့် လေ့ကျင့်သည်"],
["ဟိုတယ်အခန်း","Lǐ xiānsheng xià ge xīngqī qù Shànghǎi. Tā yào yí ge ānjìng de dānrén fáng, érqiě xīwàng fángjiān lí dìtiě zhàn jìn.","သူက ဘယ်လိုအခန်းလိုချင်သလဲ။",["တိတ်ဆိတ်သော တစ်ယောက်ခန်း","မိသားစုခန်း","မြေအောက်ရထားနှင့်ဝေးသောခန်း","ကုတင်နှစ်လုံးပါခန်း"],"တိတ်ဆိတ်သော တစ်ယောက်ခန်း"],
["ဆေးခန်းသွားခြင်း","Xiǎo Gāng tóuténg, hái yǒudiǎn fāshāo, suǒyǐ tā méi qù shàngkè. Māma dài tā qù yīyuàn.","Xiao Gang ဘာကြောင့် ကျောင်းမသွားသလဲ။",["ခေါင်းကိုက်ပြီး ဖျားလို့","ဂိမ်းကစားချင်လို့","ကျောင်းပိတ်လို့","ခရီးသွားရလို့"],"ခေါင်းကိုက်ပြီး ဖျားလို့"],
["ပိတ်ရက်အစီအစဉ်","Chén Lì xiān qù shūdiàn mǎi shū, ránhòu hé tóngxué chī wǔfàn. Xiàwǔ tāmen qù diànyǐngyuàn kàn xǐjù piàn.","နေ့လယ်ပိုင်းမှာ ဘာလုပ်ကြမလဲ။",["ဟာသရုပ်ရှင်ကြည့်မည်","စာအုပ်ဆိုင်သွားမည်","နေ့လယ်စာချက်မည်","ဘောလုံးကစားမည်"],"ဟာသရုပ်ရှင်ကြည့်မည်"],
["အိမ်နီးချင်းအသစ်","Sūn Yáng gāng lái zhèlǐ gōngzuò, hái bù tài rènshi zhè ge chéngshì. Wǒ dài tā qù fùjìn de chāoshì.","ပြောသူက Sun Yang ကို ဘာကြောင့် ကူညီသလဲ။",["မြို့ကို မသိသေးလို့","နေမကောင်းလို့","ကားလိုလို့","ဟိုတယ်ရှာလို့"],"မြို့ကို မသိသေးလို့"],
["ကျန်းမာရေး","Lín Nà zuìjìn hěn shǎo yùndòng, yě chángcháng hěn wǎn shuìjiào. Tā juédìng měitiān zǒulù sānshí fēnzhōng, wǎnshang shíyī diǎn qián shuìjiào.","Lin Na က ဘယ်အကျင့်ကို ပြောင်းမလဲ။",["နေ့တိုင်းလမ်းလျှောက်ပြီး စောစောအိပ်မည်","အလုပ်ပိုလုပ်မည်","မနက်စာမစားတော့","မြို့ပြောင်းမည်"],"နေ့တိုင်းလမ်းလျှောက်ပြီး စောစောအိပ်မည်"],
["မိသားစုညစာ","Wáng Jiā rén zài yìqǐ chī fàn. Bàba zuò yú hé qīngcài, māma mǎi shuǐguǒ, háizi bǎ wǎn hé kuàizi fàng zài zhuōzi shàng.","ကလေးတွေက ဘာကူညီသလဲ။",["ပန်းကန်နှင့်တူကို စားပွဲပေါ်တင်သည်","သစ်သီးဝယ်သည်","ငါးချက်သည်","ကားဆေးသည်"],"ပန်းကန်နှင့်တူကို စားပွဲပေါ်တင်သည်"]
];
const fillRead=[
["Wǒmen zǎoshang bā diǎn dào huǒchēzhàn. Huǒchē jiǔ diǎn cái kāi, suǒyǐ wǒmen děng le yí ge xiǎoshí.","ဘူတာကို ဘယ်အချိန်ရောက်သလဲ။",["ရှစ်နာရီ","ကိုးနာရီ","ဆယ်နာရီ","ခုနစ်နာရီ"],"ရှစ်နာရီ"],
["Wǒ hé mèimei zài jiā zuòfàn. Chī wán yǐhòu, wǒ dǎsǎo chúfáng.","စားပြီးနောက် ပြောသူက ဘယ်နေရာကို သန့်ရှင်းရေးလုပ်သလဲ။",["ဧည့်ခန်း","မီးဖိုချောင်","အိပ်ခန်း","ခြံဝင်း"],"မီးဖိုချောင်"],
["Dàwèi cóng Jiānádà lái, huì shuō Yīngyǔ hé yìdiǎn Hànyǔ.","Dàwèi က ဘယ်နိုင်ငံက လာသလဲ။",["ကနေဒါ","တရုတ်","ထိုင်း","ဂျပန်"],"ကနေဒါ"],
["Wǒ huí jiā shí fāxiàn yàoshi bú jiàn le. Dìdi zài mén pángbiān de xiézi xiàmiàn zhǎodào le.","သော့ကို ဘယ်မှာတွေ့သလဲ။",["တံခါးနား ဖိနပ်အောက်","အိတ်ထဲ","အိပ်ခန်းထဲ","ကျောင်းမှာ"],"တံခါးနား ဖိနပ်အောက်"],
["Wǒmen dǎsuàn zuò fēijī dào Kūnmíng, zài zū chē qù shān lǐ.","သူတို့က ကူမင်းကို ဘာစီးသွားမလဲ။",["လေယာဉ်","ရထား","စက်ဘီး","ဘတ်စ်ကား"],"လေယာဉ်"],
["Chènshān yǒudiǎn dà. Diànyuán ràng wǒ shìshi xiǎo yí hào, zhè yí jiàn gānghǎo héshì.","အင်္ကျီအသေးကို ဘာကြောင့်ရွေးသလဲ။",["အရင်အင်္ကျီက ကြီးလို့","ဈေးသက်သာလို့","အရင်အင်္ကျီက အနီရောင်ဖြစ်လို့","ဆိုင်ပိတ်တော့လို့"],"အရင်အင်္ကျီက ကြီးလို့"],
["Lǐ Huá bìng le, suǒyǐ wǒmen xiàwǔ qù tā jiā kàn tā.","သူတို့က Li Hua ဆီ ဘာကြောင့်သွားသလဲ။",["သူနေမကောင်းလို့","အိမ်ပြောင်းလို့","မွေးနေ့ဖြစ်လို့","စာကူညီဖို့လိုလို့"],"သူနေမကောင်းလို့"],
["Xiàyǔ de shíhou, wǒ zuò gōnggòng qìchē, suīrán màn yìdiǎn, dàn bù huì línshī.","မိုးရွာတဲ့အခါ ဘာစီးသလဲ။",["အများသုံးဘတ်စ်ကား","စက်ဘီး","တက္ကစီ","ရထား"],"အများသုံးဘတ်စ်ကား"],
["Jīntiān shì mèimei shí suì shēngrì.","ညီမလေး အသက်ဘယ်လောက်ပြည့်သလဲ။",["ဆယ်နှစ်","ဆယ့်နှစ်နှစ်","ရှစ်နှစ်","နှစ်ဆယ်"],"ဆယ်နှစ်"],
["Míngtiān yǒu Hànyǔ kǎoshì. Wáng Lì fùxí shēngcí hé yǔfǎ, yīnwèi tā xiǎng kǎo hǎo.","Wang Li က ဘာကြောင့် စာပြန်လေ့လာသလဲ။",["စာမေးပွဲကောင်းကောင်းဖြေချင်လို့","တီဗီမရှိလို့","သူငယ်ချင်းလာလို့","အလုပ်မှာရှိလို့"],"စာမေးပွဲကောင်းကောင်းဖြေချင်လို့"]
];
const headings=[
["Měitiān zǎoshang tā qǐchuáng hòu hē shuǐ, chī zǎocān, xiàwǔ yùndòng bàn ge xiǎoshí.","ကျန်းမာသောနေ့စဉ်အလေ့အကျင့်","လက်ဆောင်ဝယ်ခြင်း","ဟိုတယ်ဘွတ်ကင်","ဘာသာစကားသင်ယူခြင်း","မိသားစုအခမ်းအနား"],
["Wǒ dǎ diànhuà gěi jiǔdiàn dìng fángjiān, què rèn dào diàn hé tuìfáng rìzi.","ဟိုတယ်ဘွတ်ကင်","ရထားခရီး","ကျောင်းစာ","ဈေးဝယ်ခြင်း","အားကစား"],
["Wǒ hé tóngxué liànxí Hànyǔ, tā bāng wǒ gǎi fāyīn, wǒ bāng tā jì shēngcí.","ဘာသာစကားသင်ယူခြင်း","ရာသီဥတု","မိသားစုအခမ်းအနား","အိမ်ပြောင်းခြင်း","ချက်ပြုတ်ခြင်း"],
["Zhōurì shì bàba de shēngrì. Wǒmen mǎi dàngāo, zhǔnbèi fàncài, yìqǐ chīfàn.","မိသားစုအခမ်းအနား","ကျန်းမာရေး","ရထားခရီး","အလုပ်သွားခြင်း","ဟိုတယ်ဘွတ်ကင်"],
["Wǒ qù shāngdiàn kàn le hěn duō bāo, zuìhòu xuǎn le yí ge sòng gěi māma.","လက်ဆောင်ဝယ်ခြင်း","ဘာသာစကားသင်ယူခြင်း","မိုးလေဝသ","အလုပ်အစည်းအဝေး","အားကစား"],
["Wǒmen zǎoshang zuò huǒchē chūfā, xiàwǔ dào le lǚyóu chéngshì.","ရထားခရီး","မိသားစုအခမ်းအနား","ကျန်းမာရေး","ဈေးဝယ်ခြင်း","အိမ်သန့်ရှင်းရေး"],
["Tā měitiān tīng Zhōngwén, dú duǎn wénzhāng, hái jì shēngcí.","ဘာသာစကားသင်ယူခြင်း","ဟိုတယ်ဘွတ်ကင်","အစားအစာ","လက်ဆောင်ဝယ်ခြင်း","အားကစား"],
["Wǒmen qù yīyuàn kàn yīshēng, yīshēng jiǎnchá hòu ràng tā huí jiā xiūxi.","ဆေးကုသမှု","ရထားခရီး","မိသားစုအခမ်းအနား","အလုပ်သွားခြင်း","လက်ဆောင်ဝယ်ခြင်း"],
["Zhōumò wǒ hé péngyou qù gōngyuán pǎobù, ránhòu yìqǐ hē chá.","အားကစားနှင့်အပန်းဖြေမှု","ဟိုတယ်ဘွတ်ကင်","ဘာသာစကားသင်ယူခြင်း","လက်ဆောင်ဝယ်ခြင်း","အိမ်ပြောင်းခြင်း"],
["Wǒ xiān xǐ cài, dìdi qiē cài, ránhòu wǒmen yìqǐ zuòfàn.","အတူတကွချက်ပြုတ်ခြင်း","ရထားခရီး","မိသားစုအခမ်းအနား","ကျောင်းစာ","ဟိုတယ်ဘွတ်ကင်"],
["Wǒ dǎsǎo fángjiān, zhěnglǐ chuángpù, ránhòu bǎ yīfu fàng jìn guìzi.","အိမ်သန့်ရှင်းရေး","ရထားခရီး","အားကစား","ဆေးကုသမှု","ဘာသာစကားသင်ယူခြင်း"],
["Tiānqì hěn rè, wǒ dài le shuǐ hé màozi chūmén.","ရာသီဥတုနှင့်ပြင်ဆင်မှု","လက်ဆောင်ဝယ်ခြင်း","အလုပ်အစည်းအဝေး","အိမ်ပြောင်းခြင်း","ဘာသာစကားသင်ယူခြင်း"],
["Tā dǎ diànhuà gěi péngyou, yuē hǎo liù diǎn zài fàndiàn jiàn.","သူငယ်ချင်းနှင့်တွေ့ဆုံခြင်း","ဆေးကုသမှု","ရထားခရီး","အိမ်သန့်ရှင်းရေး","ဟိုတယ်ဘွတ်ကင်"],
["Wǒ měitiān zuò dìtiě shàngbān, xiàbān hòu zài chāoshì mǎi cài.","နေ့စဉ်အလုပ်နှင့်ဈေးဝယ်ခြင်း","မိသားစုအခမ်းအနား","အားကစား","ဆေးကုသမှု","ဘာသာစကားသင်ယူခြင်း"],
["Wǒmen yào qù jīchǎng, suǒyǐ zǎoshang liù diǎn jiù chūfā le.","လေဆိပ်သို့ခရီး","လက်ဆောင်ဝယ်ခြင်း","အိမ်သန့်ရှင်းရေး","ဘာသာစကားသင်ယူခြင်း","ကျန်းမာရေး"],
["Wǒ de tóuténg hǎo le yìdiǎn, dànshì wǒ háishi zài jiā xiūxi.","ကျန်းမာရေးနှင့်အနားယူခြင်း","ဈေးဝယ်ခြင်း","ရထားခရီး","အခမ်းအနား","ဟိုတယ်ဘွတ်ကင်"],
["Wǒmen zài túshūguǎn zhǎo zīliào, ránhòu yìqǐ zuò zuòyè.","စာလေ့လာခြင်း","မိသားစုအခမ်းအနား","လေဆိပ်သို့ခရီး","ချက်ပြုတ်ခြင်း","ဈေးဝယ်ခြင်း"],
["Wǒ xiān qù yínháng qǔ qián, ránhòu qù shāngdiàn mǎi xiézi.","ငွေထုတ်ပြီးဈေးဝယ်ခြင်း","အားကစား","ကျန်းမာရေး","ဟိုတယ်ဘွတ်ကင်","ဘာသာစကားသင်ယူခြင်း"],
["Tā xǐhuan chànggē, tīng liúxíngyuè, yě chángcháng qù kàn yīnyuè huì.","ဂီတနှင့်ဝါသနာ","အိမ်သန့်ရှင်းရေး","လေဆိပ်သို့ခရီး","ဆေးကုသမှု","ဟိုတယ်ဘွတ်ကင်"],
["Xià yǔ le, wǒmen bù qù páshān le, dǎsuàn zài jiā kàn diànyǐng.","မိုးကြောင့်အစီအစဉ်ပြောင်းခြင်း","လက်ဆောင်ဝယ်ခြင်း","ငွေထုတ်ခြင်း","စာလေ့လာခြင်း","အလုပ်သွားခြင်း"]
];
const p3=[
...reading.map(a=>({type:"mc",kind:"ဖတ်စာနားလည်မှု",title:a[0],passage:a[1],prompt:a[2],options:a[3],answer:a[4],marks:1})),
...fillRead.map(a=>({type:"mc",kind:"ဖတ်စာကွက်လပ်ဖြည့်",passage:a[0],prompt:a[1],options:a[2],answer:a[3],marks:1})),
...headings.map((a,i)=>({type:"mc",kind:"ခေါင်းစဉ်နှင့်ဖတ်စာတွဲခြင်း",title:`ခေါင်းစဉ်တွဲခြင်း ${i+1}`,passage:a[0],prompt:"ဖတ်စာနှင့် အကိုက်ညီဆုံး ခေါင်းစဉ်ကို ရွေးပါ။",options:a.slice(1),answer:a[1],marks:1}))
];
let questions=[],answers={},current=0,seconds=3600,clockTimer=null,finished=false;
function shuffle(a){let b=[...a];for(let i=b.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function start(){questions=[];[[p1,"p1"],[p2,"p2"],[p3,"p3"]].forEach(([list,key])=>{let items=JSON.parse(JSON.stringify(list));if($("order").value==="mixed")items=shuffle(items);items.forEach(q=>{q.section=key;q.id=questions.length;if(q.options){const correct=q.answer;const options=shuffle(q.options);q.options=options;q.answer=correct}if(q.tiles)q.tiles=shuffle(q.tiles);questions.push(q)})});if(questions.length!==100){alert("Exam setup error: question count is "+questions.length+", not 100.");return}answers={};current=0;finished=false;seconds=Number($("duration").value)*60;$("setup").classList.add("hidden");$("results").classList.add("hidden");$("exam").classList.remove("hidden");$("studentDisplay").textContent=$("studentName").value.trim()?"Student: "+$("studentName").value.trim():"";$("partPill").textContent="PART 1";renderTabs();render();clearInterval(clockTimer);tick();clockTimer=setInterval(()=>{seconds--;tick();if(seconds<=0)submit(true)},1000)}
function tick(){let m=Math.floor(seconds/60),s=seconds%60;$("clock").textContent=String(m).padStart(2,"0")+":"+String(s).padStart(2,"0")}
function isCorrect(q){let a=answers[q.id];if(a==null)return false;if(q.type==="tiles")return Array.isArray(a)&&a.map(i=>q.tiles[i]).join(" ")===q.answer.join(" ");return a===q.answer}
function isAnswered(q){let a=answers[q.id];return Array.isArray(a)?a.length>0:a!==undefined&&a!==""}
function score(){return questions.reduce((n,q)=>n+(isCorrect(q)?q.marks:0),0)}
function stats(){$("progressFill").style.width=(questions.filter(isAnswered).length/100*100)+"%"}
function renderTabs(){$("sectionTabs").innerHTML=sections.map(s=>`<button data-key="${s.key}">${s.name}</button>`).join("");$("sectionTabs").querySelectorAll("button").forEach(b=>b.onclick=()=>{let n=questions.findIndex(q=>q.section===b.dataset.key);if(n>=0){current=n;render()}})}
function render(){let q=questions[current];$("partPill").textContent=sections.find(s=>s.key===q.section).label;$("qTitle").textContent=q.title||q.kind;$("qInstruction").textContent=q.prompt;$("qCounter").textContent=`Question ${current+1} of 100`;$("markPill").textContent="1 mark";$("passage").textContent=q.passage||"";$("passage").classList.toggle("hidden",!q.passage);$("sectionTabs").querySelectorAll("button").forEach(b=>b.classList.toggle("active",b.dataset.key===q.section));let area=$("answerArea");area.innerHTML="";
if(q.type==="mc"){let grid=document.createElement("div");grid.className="choice-grid";q.options.forEach((opt,i)=>{let b=document.createElement("button");b.className="choice"+(answers[q.id]===opt?" selected":"");let letter=document.createElement("span");letter.className="letter";letter.textContent=String.fromCharCode(65+i);let text=document.createElement("span");text.textContent=opt;b.append(letter,text);b.onclick=()=>{answers[q.id]=opt;render();stats()};grid.append(b)});area.append(grid)}
if(q.type==="tiles"){let hint=document.createElement("p");hint.className="hint";hint.textContent="စကားလုံးအပိုင်းများကို အစီအစဉ်မှန်အောင် ဆွဲချပါ။ ဖုန်းတွင် tile ကိုနှိပ်၍ ထည့်နိုင်ပြီး ထည့်ထားသော tile ကိုနှိပ်၍ ပြန်ဖယ်နိုင်သည်။";area.append(hint);let bank=document.createElement("div");bank.className="tile-bank";let drop=document.createElement("div");drop.className="sentence-drop";let placed=Array.isArray(answers[q.id])?[...answers[q.id]]:[];function draw(){bank.innerHTML="";drop.innerHTML="";q.tiles.forEach((word,i)=>{if(placed.includes(i))return;let b=document.createElement("button");b.className="tile";b.textContent=word;b.draggable=true;b.onclick=()=>{placed.push(i);answers[q.id]=[...placed];draw();stats()};b.ondragstart=e=>{e.dataTransfer.setData("tile",String(i));e.dataTransfer.setData("from","bank")};bank.append(b)});placed.forEach((i,pos)=>{let b=document.createElement("button");b.className="tile placed";b.textContent=q.tiles[i];b.draggable=true;b.onclick=()=>{placed.splice(pos,1);answers[q.id]=[...placed];draw();stats()};b.ondragstart=e=>{e.dataTransfer.setData("tile",String(i));e.dataTransfer.setData("from","drop");e.dataTransfer.setData("pos",String(pos))};drop.append(b)})} [bank,drop].forEach(el=>{el.ondragover=e=>e.preventDefault();el.ondrop=e=>{e.preventDefault();let i=Number(e.dataTransfer.getData("tile"));if(!Number.isFinite(i))return;if(e.dataTransfer.getData("from")==="drop")placed.splice(Number(e.dataTransfer.getData("pos")),1);if(!placed.includes(i))placed.push(i);answers[q.id]=[...placed];draw();stats()}});area.append(bank,drop);draw()}
$("previous").disabled=current===0;$("next").textContent=current===99?"Submit / results →":"Next question →";stats()}
function submit(auto=false){if(finished)return;if(!auto&&!confirm("စာမေးပွဲတင်သွင်းမလား။ မဖြေထားသောမေးခွန်းများကို ၀ မှတ်ပေးပါမည်။"))return;finished=true;clearInterval(clockTimer);$("exam").classList.add("hidden");$("results").classList.remove("hidden");let got=score(),right=questions.filter(isCorrect).length,pct=got; $("resultTitle").textContent=($("studentName").value.trim()||"Student")+" — Exam report";$("finalScore").textContent=got;$("correctTotal").textContent=right;$("wrongTotal").textContent=100-right;$("percentTotal").textContent=pct+"%";$("grade").textContent=pct>=85?"အလွန်ကောင်းသည်":pct>=70?"ကောင်းသည်":pct>=50?"ဆက်လက်လေ့ကျင့်ပါ":"ထပ်မံလေ့ကျင့်ရန်လိုသည်";$("summaryText").textContent=auto?"အချိန်ပြည့်သွား၍ စာမေးပွဲကို အလိုအလျောက်တင်သွင်းလိုက်သည်။":"စာမေးပွဲတင်သွင်းပြီးပါပြီ။ အဖြေမှန်များကို ပြန်လည်စစ်ဆေးနိုင်ပါသည်။";$("answerReview").innerHTML=questions.map((q,i)=>{let a=answers[q.id];if(q.type==="tiles"&&Array.isArray(a))a=a.map(n=>q.tiles[n]).join(" ");if(!isAnswered(q))a="မဖြေထားပါ";let ans=q.type==="tiles"?q.answer.join(" "):q.answer;return `<div class="review-item"><strong>${i+1}. ${esc(q.prompt)}</strong><p class="${isCorrect(q)?"right":"wrong"}">သင့်အဖြေ: ${esc(a)} ${isCorrect(q)?"✓":"✗"}</p><p>အဖြေမှန်: <strong>${esc(ans)}</strong></p></div>`}).join("")}
$("start").addEventListener("click",start);$("previous").addEventListener("click",()=>{if(current>0){current--;render()}});$("next").addEventListener("click",()=>{if(current<99){current++;render()}else submit(false)});$("unanswered").addEventListener("click",()=>{let i=questions.findIndex(q=>!isAnswered(q));if(i<0)alert("မေးခွန်းအားလုံး ဖြေပြီးပါပြီ။");else{current=i;render()}});$("submit").addEventListener("click",()=>submit(false));$("print").addEventListener("click",()=>window.print());$("again").addEventListener("click",()=>{clearInterval(clockTimer);$("results").classList.add("hidden");$("setup").classList.remove("hidden")});
