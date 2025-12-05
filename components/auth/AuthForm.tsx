'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Lock, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
                router.push('/')
                router.refresh()
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                    },
                })
                if (error) throw error

                if (!error) {
                    const { data: { session } } = await supabase.auth.getSession()
                    if (session) {
                        router.push('/')
                        router.refresh()
                    } else {
                        toast.success("Check your email for the confirmation link.")
                    }
                }
            }
        } catch (err: any) {
            toast.error(err.message || "Authentication failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md space-y-8 p-8 backdrop-blur-md bg-black/30 border border-white/10 rounded-2xl shadow-2xl">
            <div className="text-center h-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isLogin ? 'login' : 'signup'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tight text-white">
                            {isLogin ? 'Welcome Back' : 'Join the Movement'}
                        </h2>
                        <p className="mt-2 text-sm text-gray-400">
                            {isLogin ? 'Sign in to access your account' : 'Create an account to start shopping'}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#ccff00] focus:ring-[#ccff00] transition-all duration-300"
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#ccff00] focus:ring-[#ccff00] transition-all duration-300"
                            required
                        />
                    </div>
                </div>



                <Button
                    type="submit"
                    className="w-full bg-[#ccff00] text-black hover:bg-[#b3e600] font-bold py-6 text-lg transition-all duration-300 transform hover:scale-[1.02]"
                    disabled={loading}
                >
                    {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        isLogin ? 'Sign In' : 'Sign Up'
                    )}
                </Button>
            </form>

            <div className="text-center">
                <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-gray-400 hover:text-[#ccff00] transition-colors duration-300"
                >
                    {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                </button>
            </div>
        </div>
    )
}
