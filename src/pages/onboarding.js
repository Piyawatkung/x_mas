import Link from 'next/link';
import Button from '../components/Button';

import "../app/styles/globals.css"

export default function Onboarding() {
    return (
        <main className="container mx-auto p-4 text-center">
            <div className="my-10">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 text-white ">
                    ยินดีต้อนรับสู่ <span className="text-white ">งานเทศกาล X Mas</span> 
                </h1>
                {/* <div className="flex justify-center mb-8">
                        <img src="/images/owl_welcome.png" alt="Welcome Owl" className="w-40 md:w-60" />
                    </div> */}
                <p className="text-white mb-8">
                    คุณจะผ่านเรื่องราวต่างๆ เพื่อดูว่า<br />
                    <span className="text-white  font-bold">มาดูกันว่าคุณจะได้รับบทบาทไหน ในงานเทศกาลคริสต์มาส</span>
                </p>
                
                <Link href="/quiz">
                    <Button>เริ่มผจญภัย!</Button>
                </Link>
            </div>
        </main>

    );
}
