import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Link from 'next/link';  // ใช้เพื่อสร้างลิงก์สำหรับเริ่มใหม่

import Button from '../components/Button'

const Result = () => {
    const router = useRouter();
    const [scores, setScores] = useState({
        Openness: 0,
        Conscientiousness: 0,
        Extraversion: 0,
        Agreeableness: 0,
        Neuroticism: 0,
    });
    const [highestTrait, setHighestTrait] = useState(''); // เก็บลักษณะบุคลิกภาพที่มีคะแนนสูงสุด

    // คำอธิบายสำหรับลักษณะบุคลิกภาพแต่ละประเภท (เป็น Array)
    const traitDescriptions = [
        { trait: 'Openness', description: ': เปิดกว้าง มีความคิดสร้างสรรค์ และกล้าที่จะลองสิ่งใหม่ๆ' },
        { trait: 'Conscientiousness', description: 'C (Conscientiousness): รอบคอบ มีระเบียบแบบแผน และมีวินัยในการทำงาน' },
        { trait: 'Extraversion', description: ': ชอบเข้าสังคม พูดเก่ง และสนุกกับการทำกิจกรรมร่วมกับผู้อื่น' },
        { trait: 'Agreeableness', description: ': ใจดี เห็นอกเห็นใจผู้อื่น และมีความร่วมมือดี' },
        { trait: 'Neuroticism', description: ': อารมณ์แปรปรวน เครียดง่าย และวิตกกังวลบ่อย' },
    ];

    // เมื่อ component โหลด ให้ดึงข้อมูลคะแนนจาก query
    useEffect(() => {
        if (router.query.scores) {
            const parsedScores = JSON.parse(router.query.scores);
            setScores(parsedScores);

            // คำนวณหาลักษณะบุคลิกภาพที่มีคะแนนสูงสุด
            const highest = Object.keys(parsedScores).reduce((a, b) =>
                parsedScores[a] > parsedScores[b] ? a : b
            );
            setHighestTrait(highest);  // เก็บลักษณะที่มีคะแนนสูงสุดใน state
        }

        // ล้างค่าจาก localStorage เมื่อมาถึงหน้าผลลัพธ์
        localStorage.removeItem('currentQuestionIndex');
        localStorage.removeItem('scores');
        localStorage.removeItem('showResults');
    }, [router.query.scores]);

    // ค้นหาคำอธิบายของลักษณะที่มีคะแนนสูงสุด
    const highestTraitDescription = traitDescriptions.find(
        (traitDesc) => traitDesc.trait === highestTrait
    );

    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="text-white">
                <h2 className="text-2xl font-bold mb-4">ผลลัพธ์ของคุณ</h2>
                <ul className="mt-4 space-y-2">
                    {Object.entries(scores).map(([trait, score], index) => (
                        <li key={index}>
                            <strong>{trait}</strong>: {score}
                        </li>
                    ))}
                </ul>

                {/* แสดงลักษณะบุคลิกภาพที่มีคะแนนสูงสุด */}
                {highestTraitDescription && (
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold">ลักษณะบุคลิกภาพของคุณคือ:</h3>
                        <p className="mt-2">{highestTraitDescription.trait}{highestTraitDescription.description}</p>
                    </div>
                )}

                {/* ปุ่มเริ่มใหม่ */}
                <div className="mt-8">
                    <Link href="/onboarding">
                        <Button>เริ่มตอบคำถามใหม่อีกครั้ง</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Result;
