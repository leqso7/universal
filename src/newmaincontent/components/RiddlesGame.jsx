import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext.jsx';
import HomeButton from './HomeButton';

const riddles = [
  {
    question: "ხმაბულბულა შავოსანი, ჭახჭახებს მზის ამოსვლამდე, ცხოვრობს შამბში, ჰქვია...",
    options: ["ლერწამი", "ბულბული", "შაშვი"],
    correctAnswer: "ლერწამი"
  },
  {
    question: "პიტალო კლდეზე ბინადრობს, არ ეშინია ქარ-წვიმის, ფრინველთა მეფედ ითვლება თვალებბრიალა...",
    options: ["არწივი", "შევარდენი", "ქორი"],
    correctAnswer: "არწივი"
  },
  {
    question: "ღამით ცაზე დასეირნობს, გაანათა არე მარე, მეგობრებიც ბლომადა ჰყავს, შენც მიხვდები არის...",
    options: ["მთვარე", "ვარსკვლავი", "ღრუბელი"],
    correctAnswer: "მთვარე"
  },
  {
    question: "ფიცრის ათი ნაჭერი გარანდე და დაჭერი, გაუკეთე მურას სახლს იატაკი...",
    options: ["დაფები", "ფიცრები", "ძელები"],
    correctAnswer: "დაფები"
  },
  {
    question: "ზის მოთმენით მდინარესთან. გული აქვს და ო, რა გული ამიტომაც ხშირად ხვდება იმის ანკესს...",
    options: ["მეთევზე", "თევზი", "კალმახი"],
    correctAnswer: "მეთევზე"
  },
  {
    question: "თავზე ხე ადგას ისეთი, არწივს სატახტოდ მოუნდა, თურმე ზედ ქორიც ბუდობდა, მისთვის შეარქვეს...",
    options: ["ქორთა", "მუხა", "ნაძვი"],
    correctAnswer: "ქორთა"
  },
  {
    question: "ისიც მყისვე იმეორებს, თუ რა უჩურჩულე ყურში, ჭრელა-ჭრულა ფრინველია, მრგვალნისკარტა...",
    options: ["თუთიყუში", "შაშვი", "ჩიტი"],
    correctAnswer: "თუთიყუში"
  },
  {
    question: "ხელის გულს თუ უჩვენებ, ცოტაღა დაფიქრდი, ცივ ზამთარში ზემოდან, რა გეცემა?...",
    options: ["ფიფქი", "წვიმა", "სეტყვა"],
    correctAnswer: "ფიფქი"
  },
  {
    question: "შინდის ხისგან გათლილი წელში ორად გაეკეცეს, სულ კეცებთან ტრიალებს, თქვი, რა ჰქვია?...",
    options: ["ჭოკი", "ჯოხი", "კეტი"],
    correctAnswer: "ჭოკი"
  },
  {
    question: "ბალახებში იმალება, ჭია არის გრძელი, შხამიანი ქვემძრომია, რა ყოფილა?...",
    options: ["გველი", "ხვლიკი", "ჯოჯო"],
    correctAnswer: "გველი"
  },
  {
    question: "არ ასუფთავებს, ანაგვიანებს, ან სულ არ მოდის, ან...",
    options: ["წვიმა", "ქარი", "თოვლი"],
    correctAnswer: "წვიმა"
  },
  {
    question: "საბანი და ბანი, ბანი და საბანი, თხუპნიას აქვს ხელი საპნით...",
    options: ["დაბანილი", "გასაპნული", "გარეცხილი"],
    correctAnswer: "დაბანილი"
  },
  {
    question: "ზარმაცისთვის აბეზარი, დილით ადრე რეკავს...",
    options: ["მაღვიძარა", "ზარი", "საათი"],
    correctAnswer: "მაღვიძარა"
  },
  {
    question: "იმდენია ჭანჭური, ვერ ჩაიტევს ცხრა...",
    options: ["ქვაბი", "ჯამი", "თეფში"],
    correctAnswer: "ქვაბი"
  },
  {
    question: "თუ საჩუქრად ხბოს ელი, ავაშენოთ...",
    options: ["ბოსელი", "გომური", "საბძელი"],
    correctAnswer: "ბოსელი"
  },
  {
    question: "მხეცებს შორის შეწყდეს ომი, ღრიალებდა მეფე...",
    options: ["ლომი", "ვეფხვი", "დათვი"],
    correctAnswer: "ლომი"
  },
  {
    question: "ჩაბალახივით არა აქვს კუდი, თავზე ახურავთ და ჰქვია...",
    options: ["ქუდი", "ჩაჩი", "კეპი"],
    correctAnswer: "ქუდი"
  },
  {
    question: "ქართველ კაცზე უკეთ, ალბათ, არვინ იცის მისი ფასი, ნაყოფს ყურძენს ეძახიან, მცენარეს კი ჰქვია...",
    options: ["ვაზი", "ხე", "ბუჩქი"],
    correctAnswer: "ვაზი"
  },
  {
    question: "ვერაფერი დააბრკოლებს, ვერც მთა, ვერც ტყე, ვერც წყალი მალე ჩემს აივანზე დაიბუდებს...",
    options: ["მერცხალი", "ჩიტი", "თოლია"],
    correctAnswer: "მერცხალი"
  },
  {
    question: "ლამაზია ევროპა, საოცრად ლამაზია, მაგრამ არანაკლებად ლამაზია...",
    options: ["საქართველო", "კავკასია", "იბერია"],
    correctAnswer: "საქართველო"
  },
  {
    question: "დღედაღამე ცეცხლზე იწვის, საოცარი ადგას ჯაფა, მაგრამ მხოლოდ ქვაბმა იცის, თუ რა ტანჯვას უძლებს...",
    options: ["ფაფა", "წვენი", "ჩაი"],
    correctAnswer: "ფაფა"
  },
  {
    question: "ყვავილები დაკოცნა ცვარით ნასათუთარი, ნექტარიც აქვს, ნესტარიც, თქვი, რა ქვია?",
    options: ["ფუტკარი", "პეპელა", "კრაზანა"],
    correctAnswer: "ფუტკარი"
  },
  {
    question: "ბაღ-ბოსტნებში დაფრუტუნებს, და ვაშლების არის ხარბი, ეკლის კაბა ჩაუცვია, რა არის და დინგა...",
    options: ["ღორი", "ზღარბი", "დათვი"],
    correctAnswer: "ღორი"
  },
  {
    question: "ზოლიანი ცხენი არის, მას არ უნდა ტყეში ძებნა, მწვანე ბალახს ეტანება, და რა ცხოველია?",
    options: ["ზებრა", "ცხენი", "ვირი"],
    correctAnswer: "ზებრა"
  },
  {
    question: "ძლიერ უყვარს მას ბანანი და თუ იგრძნო მისი სუნი, კენწეროზე მოექცევა, ის პრანჭია...",
    options: ["მაიმუნი", "ბავშვი", "კატა"],
    correctAnswer: "მაიმუნი"
  },
  {
    question: "ზამთრის თოვლი სად წავიდა? სად და მიწამ შესვა. მალე მიწას დახნავენ და დაიწყება...",
    options: ["გაზაფხული", "ზაფხული", "შემოდგომა"],
    correctAnswer: "გაზაფხული"
  },
  {
    question: "ეს რა გუგუნებს მინდორში? თოვლი დადნა და თბილა. შრომით იწყება გლეხკაცის საგაზაფხულო დილა. ხარობს ამ მიწის პატრონი. თურმე გუგუნებს...",
    options: ["ტრაქტორი", "მანქანა", "კომბაინი"],
    correctAnswer: "ტრაქტორი"
  },
  {
    question: "ჭას მიაგავს თიხისას, არც ჯამია, არც ქვევრი. თუ მეპურემ ივარგა, შოთი ცხვება შიგ ბევრი. გინდა ხმელი ფიჩხიც, თორემ ვერ დაგიცხობთ შოთებს...",
    options: ["თონე", "ღუმელი", "ქურა"],
    correctAnswer: "თონე"
  },
  {
    question: "პატარები თივაზე გადადიან ყირაზე. წამოჭიმეს თივით ვეებერთელა...",
    options: ["ზვინი", "გროვა", "ბულული"],
    correctAnswer: "ზვინი"
  },
  {
    question: "ვინც გადმოცემს სინამდვილეს, ეწოდება მას მართალი, ხოლო სწორად მოქმედების წესებს ქვია...",
    options: ["სამართალი", "კანონი", "წესი"],
    correctAnswer: "სამართალი"
  },
  {
    question: "რწმენა გახლავთ სიბრძნის წყარო, სამყაროსთვის დედაღერძი! წინაპართა დანაბარებ თხოვნას ჰქვია რა?",
    options: ["ლოცვა", "ვედრება", "მუდარა"],
    correctAnswer: "ლოცვა"
  },
  {
    question: "ქარწვიმებთან ღამენათევს, არწივის შვილს ჰქვია...",
    options: ["ბექა", "გიორგი", "დათო"],
    correctAnswer: "ბექა"
  },
  {
    question: "ჩვენს სამშობლოს ვინ დაიცავს, ვინ იქნება მისი ფარი? მეომრების დიდი გუნდი, ყველას ერთად ჰქვია...",
    options: ["ჯარი", "არმია", "რაზმი"],
    correctAnswer: "ჯარი"
  },
  {
    question: "მზე ამოვა თუ არა, გავა ერთი წამი, წვეთი ქრება ბალახზე, ეწოდება...",
    options: ["ცვარი", "ნამი", "წვიმა"],
    correctAnswer: "ცვარი"
  },
  {
    question: "მწიფე მარცვლებს კალათში ვყრით, ლამის წვენმა გამოჟონოს, ვარდისფერი ნაყოფი აქვს, მაყვალსაც ჰგავს, ჰქვია...",
    options: ["ჟოლო", "მარწყვი", "მოცხარი"],
    correctAnswer: "ჟოლო"
  },
  {
    question: "ხაზიანიც გვაქვს, უხაზოც, წიგნებში შემორეული, მის ფურცლებზე ვწერთ და ვხატავთ, აბა, რა არის?",
    options: ["ფურცელი", "რვეული", "წიგნი"],
    correctAnswer: "ფურცელი"
  },
  {
    question: "როცა დადგა გაზაფხული და მერცხლები დაგვიბრუნდნენ, ტალახით და ჩალა-ბულით თქვით, რა აიშენეს?",
    options: ["ბუდე", "სახლი", "კარავი"],
    correctAnswer: "ბუდე"
  },
  {
    question: "როცა თოვს, ყინავს, ქარი ქრის და ბინები გვაქვს დამთბარი, აბა, ბავშვებო, წლის ამ დროს, რა ეწოდება?",
    options: ["ზამთარი", "შემოდგომა", "გაზაფხული"],
    correctAnswer: "ზამთარი"
  },
  {
    question: "თავის დაბადების დღეზე ახალ კაბას ელის ლილი, საყელოზე დაუკერეს სამი ვარდისფერი...",
    options: ["ღილი", "ყვავილი", "ლენტი"],
    correctAnswer: "ღილი"
  },
  {
    question: "დავთესე, მოვმკე, გავლეწე, დავფქვი, - ბრუნავდა ბორბალი, მოვზილე, პური დავაცხვე, რა მოვიყვანე?",
    options: ["პური", "ხორბალი", "სიმინდი"],
    correctAnswer: "პური"
  },
  {
    question: "მწვანე კაბა აცვია, ქვეშ თეთრი პერანგი, გემრიელი გული აქვს, მაგრამ მწარე კანი",
    options: ["კიტრი", "მწვანილი", "სალათი"],
    correctAnswer: "კიტრი"
  },
  {
    question: "ფეხებს მაღლა აიქნევს, ჭაობებში დასეირნობს, გრძელი კისერი აქვს და ბაყაყებს დაეძებს",
    options: ["ყარყატი", "წერო", "იხვი"],
    correctAnswer: "ყარყატი"
  },
  {
    question: "რძისგან არის გაკეთებული, თეთრია და გემრიელი, საჭმელად გამოდგება და სასარგებლოც არის",
    options: ["ხაჭო", "ყველი", "არაჟანი"],
    correctAnswer: "ხაჭო"
  },
  {
    question: "ყველა მისით ვარსებობთ, ვერ წავავლე მე ხელი, ჩვენს ფილტვებშიც ნავარდობს, რა ყოფილა?",
    options: ["ჰაერი", "წყალი", "ქარი"],
    correctAnswer: "ჰაერი"
  },
  {
    question: "რძის ნაწარმი მეცა ვარ, ენერგიის მარაგი, პურს წაუსვით, მიირთვით გემრიელი",
    options: ["კარაქი", "ყველი", "ხაჭო"],
    correctAnswer: "კარაქი"
  },
  {
    question: "მინდორ ველზე დახტის, ყანებზე აქვს თვალია, მწვანე ფერის მწერია, და მას ჰქვია",
    options: ["კალია", "ჭიამაია", "პეპელა"],
    correctAnswer: "კალია"
  },
  {
    question: "დაზამთრდა და ქალაქს თავზე თეთრი ქუდი ებურა... მიგვატოვეს ჩიტუნებმა მარტის თვემდე ეულად... მხოლოდ ერთი არ გვღალატობს, დაგვჭიკჭიკებს ერთგულად, პაწაწინა, მობუზული, თქვი, ვინ არის?",
    options: ["ბეღურა", "მერცხალი", "შაშვი"],
    correctAnswer: "ბეღურა"
  },
  {
    question: "აი, ნახე, ვარია, მუჭანახევარია, კვერცხი დადო, კვერცხუნა... ვის ეზოშიც შესულა, მისი შიშით ღობეში ზღარბმაც კი ვერ შესუნა. ძირს რომ დაიჭახჭახებს, ცაში აფრთხობს ძერასა, მელას თვალი დათხარა, წუწკს და გაიძვერასა, ტანპატარა, ნაცარა, ახლა მაინც იცანი, კლანჭი უგავს ციცასა მიტომ ქვია",
    options: ["ქათამი", "მამალი", "წიწილა"],
    correctAnswer: "ქათამი"
  },
  {
    question: "ააცეკვა ლამაზად ავთანდილი და ირა, ცხრილის რკალა, ძროფაშვა, რომ გახურდა",
    options: ["ფარიკაობა", "ცეკვა", "ჭიდაობა"],
    correctAnswer: "ფარიკაობა"
  },
  {
    question: "ისე გემრიელი ვარ, მოგადგებათ ნერწყვი, მაკრავს თეთრი ნაჭუჭი, ვინ ვყოფილვარ?",
    options: ["კვერცხი", "ნიგოზი", "ნუში"],
    correctAnswer: "კვერცხი"
  },
];

const GameContainer = styled.div`
  position: fixed;
  inset: 0;
  margin: 0;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, 
    rgba(100, 204, 240, 0.9), 
    rgba(128, 208, 199, 0.9), 
    rgba(86, 188, 189, 0.9), 
    rgba(82, 182, 154, 0.9)
  );
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  overflow-y: auto;
  padding-bottom: calc(env(safe-area-inset-bottom) + 60px);

  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const Message = styled.div`
  color: #2c3e50;
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  text-align: center;
  margin: 20px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  position: relative;
  overflow: hidden;
  max-width: 90%;
  transform-origin: center;
  animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  @keyframes popIn {
    0% { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #4CAF50, #81C784);
    animation: progress 5s linear;
    width: 100%;
  }

  @keyframes progress {
    from { width: 100%; }
    to { width: 0%; }
  }
`;

const GameArea = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: clamp(15px, 3vw, 30px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(15px, 3vw, 25px);
  animation: fadeIn 0.5s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Question = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: clamp(20px, 4vw, 30px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  width: 100%;
  text-align: center;
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  margin-bottom: clamp(15px, 3vw, 25px);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #64B5F6, #42A5F5);
    border-radius: 4px;
  }
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(10px, 2vw, 15px);
  width: 100%;
  padding: 0 clamp(10px, 2vw, 20px);
`;

const Option = styled.button`
  padding: clamp(15px, 3vw, 20px);
  background: ${props => {
    if (props.$isAnswered && props.$isSelected) {
      return props.$isCorrect 
        ? 'linear-gradient(135deg, #66BB6A, #4CAF50)'
        : 'linear-gradient(135deg, #EF5350, #F44336)';
    }
    return props.$isSelected 
      ? 'linear-gradient(135deg, #42A5F5, #2196F3)'
      : 'rgba(255, 255, 255, 0.95)';
  }};
  color: ${props => props.$isSelected ? 'white' : '#2c3e50'};
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }

  &:focus:not(:active)::after {
    animation: ripple 1s ease-out;
  }

  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 0.5;
    }
    100% {
      transform: scale(100, 100);
      opacity: 0;
    }
  }
`;

const Score = styled.div`
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: clamp(15px, 3vw, 25px) 0;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.5s ease-out;

  @keyframes slideIn {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;

const PraiseMessage = styled.div`
  color: #2c3e50;
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  text-align: center;
  margin: 15px 0;
  padding: 15px 25px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  
  @keyframes bounceIn {
    0% { transform: scale(0.3); opacity: 0; }
    50% { transform: scale(1.1); }
    70% { transform: scale(0.9); }
    100% { transform: scale(1); opacity: 1; }
  }
`;

const RiddlesGame = () => {
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [solvedCount, setSolvedCount] = useState(0);
  const [praiseMessage, setPraiseMessage] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextMessage, setNextMessage] = useState('');
  const { updateGameProgress, getGameStats } = usePlayer();

  const stats = useMemo(() => getGameStats('riddles'), [getGameStats]);
  const completedRiddles = useMemo(() => stats.completedTasks, [stats]);

  const findFirstUnsolvedRiddle = useCallback(() => {
    let index = 0;
    while (completedRiddles.has(index) && index < riddles.length) {
      index++;
    }
    return index >= riddles.length ? 0 : index;
  }, [completedRiddles]);

  const shuffleOptions = useCallback((index) => {
    const options = [...riddles[index].options];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }, []);

  useEffect(() => {
    const newIndex = findFirstUnsolvedRiddle();
    setCurrentRiddleIndex(newIndex);
    setShuffledOptions(shuffleOptions(newIndex));
    setSolvedCount(completedRiddles.size);
  }, [findFirstUnsolvedRiddle, shuffleOptions, completedRiddles]);

  useEffect(() => {
    setSolvedCount(completedRiddles.size);
  }, [completedRiddles]);

  useEffect(() => {
    if (solvedCount === riddles.length) {
      setPraiseMessage('ყოჩაღ! ყველა გამოცანა გამოიცანი! 🎉');
      setTimeout(() => {
        updateGameProgress('riddles', Date.now(), { reset: true });
        const newIndex = 0;
        setCurrentRiddleIndex(newIndex);
        setSelectedOption(null);
        setIsCorrect(null);
        setSolvedCount(0);
        setPraiseMessage('');
        setIsTransitioning(false);
        setShuffledOptions(shuffleOptions(newIndex));
      }, 3000);
    }
  }, [solvedCount, updateGameProgress, shuffleOptions]);

  const getRandomPraise = () => {
    const praises = [
      'ყოჩაღ! შესანიშნავად გაართვი თავი! 🌟',
      'ბრავო! ძალიან კარგად შეასრულე! 🏆',
      'არაჩვეულებრივია! გააგრძელე ასე! 🌈',
      'საოცარი ხარ! კიდევ ერთი წარმატება! 🎯',
      'შესანიშნავია! ნამდვილი გენიოსი ხარ! 🎨'
    ];
    return praises[Math.floor(Math.random() * praises.length)];
  };

  const handleOptionSelect = useCallback((option) => {
    if (selectedOption !== null || isTransitioning) return;
    
    setSelectedOption(option);
    const correct = option === riddles[currentRiddleIndex].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setIsTransitioning(true);
      setPraiseMessage(getRandomPraise());

      const timestamp = Date.now();
      const progress = { 
        taskIndex: currentRiddleIndex,
        type: 'riddle'
      };
      
      updateGameProgress('riddles', timestamp, progress);
      
      let timeLeft = 5;
      const countdownInterval = setInterval(() => {
        timeLeft--;
        
        if (timeLeft === 0) {
          clearInterval(countdownInterval);
          let nextIndex = currentRiddleIndex + 1;
          while (nextIndex < riddles.length && completedRiddles.has(nextIndex)) {
            nextIndex++;
          }
          if (nextIndex >= riddles.length) {
            nextIndex = 0;
          }
          
          setCurrentRiddleIndex(nextIndex);
          setSelectedOption(null);
          setIsCorrect(null);
          setPraiseMessage('');
          setNextMessage('');
          setIsTransitioning(false);
          setShuffledOptions(shuffleOptions(nextIndex));
          setSolvedCount(completedRiddles.size + 1);
        }
      }, 1000);
    } else {
      setTimeout(() => {
        setSelectedOption(null);
        setIsCorrect(null);
      }, 1500);
    }
  }, [selectedOption, isTransitioning, currentRiddleIndex, shuffleOptions, updateGameProgress, completedRiddles, riddles.length]);

  return (
    <GameContainer>
      <HomeButton />
      <GameArea>
        <Score>გამოცნობილი გამოცანები: {solvedCount}</Score>
        {praiseMessage && (
          <>
            <Message>{praiseMessage}</Message>
            {nextMessage && (
              <div style={{ 
                color: 'white', 
                fontSize: '1rem', 
                marginTop: '10px',
                textAlign: 'center' 
              }}>
                {nextMessage}
              </div>
            )}
          </>
        )}
        <Question>{riddles[currentRiddleIndex].question}</Question>
        <OptionsContainer>
          {shuffledOptions.map((option, index) => (
            <Option
              key={index}
              onClick={() => handleOptionSelect(option)}
              disabled={isCorrect !== null || isTransitioning}
              $isSelected={selectedOption === option}
              $isAnswered={isCorrect !== null}
              $isCorrect={isCorrect && selectedOption === option}
            >
              {option}
            </Option>
          ))}
        </OptionsContainer>
      </GameArea>
    </GameContainer>
  );
};

export default RiddlesGame;
