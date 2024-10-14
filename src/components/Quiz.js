import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';  // ใช้ Router ของ Next.js

import Button from './Button';

const Quiz = () => {
    const router = useRouter();  // ประกาศใช้งาน router

    // คำถามและตัวเลือก
    const questions = [
        {
            question: 'คุณจะเปิดเพลงคริสต์มาสอะไรเพื่อสร้างบรรยากาศแรกของวันดีๆ นี้?',
            options: [
                { answer: 'Jingle Bells Rock', points: { Extraversion: 3 } },
                { answer: 'Silent Night', points: { Neuroticism: 2 } },
                { answer: 'All I Want for Christmas is You', points: { Extraversion: 5 } },
                { answer: 'Have Yourself a Merry Little Christmas', points: { Agreeableness: 4 } },
                { answer: 'Last Christmas', points: { Neuroticism: 3 } },
            ],
        },
        {
            question: 'คุณจะทำอะไรเป็นอย่างแรกในเช้าวันคริสต์มาส?',
            options: [
                { answer: 'เปิดของขวัญ', points: { Openness: 4 } },
                { answer: 'ดื่มช็อกโกแลตร้อน', points: { Conscientiousness: 3 } },
                { answer: 'นอนหลับต่อ', points: { Neuroticism: 2 } },
                { answer: 'ไปเดินเล่น', points: { Extraversion: 3 } },
                { answer: 'ทำอาหารเช้า', points: { Agreeableness: 4 } },
            ],
        },
        {
            question: 'ภาพยนตร์คริสต์มาสเรื่องไหนที่คุณชอบมากที่สุด?',
            options: [
                { answer: 'Home Alone', points: { Openness: 3 } },
                { answer: 'The Grinch', points: { Neuroticism: 3 } },
                { answer: 'Elf', points: { Extraversion: 4 } },
                { answer: 'A Christmas Carol', points: { Conscientiousness: 3 } },
                { answer: 'The Polar Express', points: { Agreeableness: 5 } },
            ],
        },
        {
            question: 'คุณจะตกแต่งต้นคริสต์มาสด้วยอะไร?',
            options: [
                { answer: 'ไฟคริสต์มาส', points: { Openness: 4 } },
                { answer: 'ลูกบอลคริสต์มาส', points: { Conscientiousness: 3 } },
                { answer: 'ริบบิ้น', points: { Agreeableness: 4 } },
                { answer: 'ของประดับที่ทำเอง', points: { Openness: 5 } },
                { answer: 'ตุ๊กตาหิมะ', points: { Neuroticism: 2 } },
            ],
        },
        {
            question: 'อาหารคริสต์มาสที่คุณชอบคืออะไร?',
            options: [
                { answer: 'พายฟักทอง', points: { Conscientiousness: 3 } },
                { answer: 'ไก่งวง', points: { Extraversion: 4 } },
                { answer: 'แฮมอบ', points: { Agreeableness: 4 } },
                { answer: 'ขนมปังขิง', points: { Openness: 5 } },
                { answer: 'คุกกี้', points: { Neuroticism: 3 } },
            ],
        },
        {
            question: 'คุณจะใช้เวลาคริสต์มาสกับใคร?',
            options: [
                { answer: 'ครอบครัว', points: { Agreeableness: 5 } },
                { answer: 'เพื่อนสนิท', points: { Extraversion: 4 } },
                { answer: 'คนรัก', points: { Openness: 3 } },
                { answer: 'คนเดียว', points: { Neuroticism: 2 } },
                { answer: 'เพื่อนร่วมงาน', points: { Conscientiousness: 4 } },
            ],
        },
        {
            question: 'คุณชอบกิจกรรมคริสต์มาสแบบไหน?',
            options: [
                { answer: 'ปาร์ตี้', points: { Extraversion: 5 } },
                { answer: 'ทำอาหาร', points: { Conscientiousness: 4 } },
                { answer: 'ตกแต่งบ้าน', points: { Openness: 4 } },
                { answer: 'พักผ่อนเงียบๆ', points: { Neuroticism: 3 } },
                { answer: 'แลกของขวัญ', points: { Agreeableness: 4 } },
            ],
        },
    ];

    // สถานะ
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scores, setScores] = useState({ Openness: 0, Conscientiousness: 0, Extraversion: 0, Agreeableness: 0, Neuroticism: 0 });
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(true);  // สถานะสำหรับการโหลดข้อมูลจาก localStorage

    // โหลดข้อมูลจาก localStorage เมื่อ component เริ่มทำงาน
    useEffect(() => {
        const savedQuestionIndex = localStorage.getItem('currentQuestionIndex');
        const savedScores = localStorage.getItem('scores');
        const savedShowResults = localStorage.getItem('showResults');

        if (savedQuestionIndex !== null) {
            setCurrentQuestionIndex(Number(savedQuestionIndex));
        }
        if (savedScores !== null) {
            setScores(JSON.parse(savedScores));
        }
        if (savedShowResults !== null) {
            setShowResults(JSON.parse(savedShowResults));
        }

        setLoading(false);  // ตั้งค่าว่าการโหลดข้อมูลเสร็จแล้ว
    }, []);

    // บันทึกข้อมูลลงใน localStorage เมื่อข้อมูลมีการเปลี่ยนแปลง
    useEffect(() => {
        if (!loading) {  // ตรวจสอบว่าเสร็จสิ้นการโหลดข้อมูลจาก localStorage แล้ว
            localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
            localStorage.setItem('scores', JSON.stringify(scores));
            localStorage.setItem('showResults', JSON.stringify(showResults));
        }
    }, [currentQuestionIndex, scores, showResults, loading]);

    // ฟังก์ชันจัดการเมื่อเลือกตัวเลือก
    const handleSelectOption = (option) => {
        // อัปเดตคะแนน
        const newScores = { ...scores };
        for (const [trait, value] of Object.entries(option.points)) {
            newScores[trait] += value;
        }
        setScores(newScores);

        // ไปยังคำถามถัดไป หรือแสดงผลลัพธ์
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            router.push({
                pathname: '/result',
                query: { scores: JSON.stringify(newScores) }  // ส่งคะแนนไปที่ result.js
            });
        }
    };

    if (loading) {
        return <div className="text-white">Loading...</div>;  // แสดงข้อความเมื่อกำลังโหลดข้อมูล
    }

    return (
        <div className="min-h-screen flex flex-col items-center">
            {/* แสดงคำถามหรือผลลัพธ์ */}
            {!showResults ? (
                <>
                    <div className="text-white mb-4 text-center">
                        <h1 className="text-2xl font-bold">Christmas Quiz</h1>
                        <p className="mt-2">{questions[currentQuestionIndex].question}</p>
                    </div>

                    {/* แสดงตัวเลือก */}
                    <div className="w-full max-w-sm space-y-4">
                        {questions[currentQuestionIndex].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelectOption(option)}
                                className="w-full p-4 bg-green-700 rounded-lg text-white cursor-pointer transition hover:bg-green-600"
                            >
                                {`${String.fromCharCode(65 + index)}: ${option.answer}`}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-white">
                    <h2 className="text-2xl font-bold">ผลลัพธ์ของคุณ</h2>
                    <ul className="mt-4 space-y-2">
                        {Object.entries(scores).map(([trait, score], index) => (
                            <li key={index}>
                                <strong>{trait}</strong>: {score}
                            </li>
                        ))}
                    </ul>
                    <Button onClick={() => resetQuiz}>ทำแบบทดสอบอีกครั้ง</Button>
                </div>
            )}
        </div>
    );
};

export default Quiz;
