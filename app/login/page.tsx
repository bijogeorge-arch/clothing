import AuthForm from '@/components/auth/AuthForm'
import Image from 'next/image'

export default function LoginPage() {
    return (
        <div className="min-h-screen w-full flex">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                <Image
                    src="https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2071&auto=format&fit=crop"
                    alt="Streetwear Aesthetic"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="relative z-20 p-12 text-white">
                    <h1 className="text-6xl font-bold mb-4 tracking-tighter">CHALCHITRA</h1>
                    <p className="text-xl text-gray-300 max-w-md">
                        Redefining streetwear with cinematic aesthetics. Join the revolution.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-black p-8 relative">
                {/* Background Gradients */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

                <AuthForm />
            </div>
        </div>
    )
}
