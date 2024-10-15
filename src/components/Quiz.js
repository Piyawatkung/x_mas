import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';  // ใช้ Router ของ Next.js
import { questions } from '../data/questions';  // นำเข้าคำถามจากไฟล์ questions.js

import Button from './Button';

const Quiz = () => {
    const router = useRouter();  // ประกาศใช้งาน router

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
