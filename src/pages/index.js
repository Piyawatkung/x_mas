import Link from 'next/link';
import Button from '../components/Button';

export default function Home() {
    return (
        <main className="">
            <div className="my-10">
                {/* <h2 className="text-gray-500 mb-2">21 คำถาม | 4 นาที</h2> */}
                <div className="flex justify-center mb-8">
                    <img src="/assets/images/welcome_1.png" alt="Welcome" />
                </div>
                {/* <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        คริสต์มาสใกล้เข้ามาแล้ว
                    </h1> */}
                <p className="text-white mb-8">
                    คุณได้รับบทบาทสำคัญในการจัดงานปาร์ตี้ที่ทุกคน
                    จะได้มาร่วมสนุกกัน
                    มาลองตอบคำถามเพื่อค้นหาว่า
                    คุณจะทำอะไรบ้างในคืนคริสต์มาสที่กำลังมาถึงนี้!
                </p>
                <Link href="/onboarding">
                    <Button>เข้าสู่เทศกาลคริสต์มาส</Button>
                </Link>
            </div>
        </main>
    );
}
