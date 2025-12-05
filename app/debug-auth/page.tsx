import { createClient } from '@/utils/supabase/server'

export default async function DebugAuthPage() {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    return (
        <div className="p-8 font-mono text-sm max-w-2xl mx-auto mt-10 border rounded bg-zinc-900 text-white">
            <h1 className="text-xl font-bold mb-4 text-green-400">Auth Debugger</h1>

            <div className="space-y-4">
                <div>
                    <h2 className="text-zinc-500 mb-1">User Status</h2>
                    <div className="p-2 bg-black rounded border border-zinc-800">
                        {user ? '✅ Logged In' : '❌ Not Logged In'}
                    </div>
                </div>

                {user && (
                    <>
                        <div>
                            <h2 className="text-zinc-500 mb-1">User ID</h2>
                            <div className="p-2 bg-black rounded border border-zinc-800">
                                {user.id}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-zinc-500 mb-1">Email</h2>
                            <div className="p-2 bg-black rounded border border-zinc-800">
                                {user.email}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-zinc-500 mb-1">App Metadata (Role is here)</h2>
                            <pre className="p-2 bg-black rounded border border-zinc-800 overflow-auto">
                                {JSON.stringify(user.app_metadata, null, 2)}
                            </pre>
                        </div>

                        <div>
                            <h2 className="text-zinc-500 mb-1">User Metadata</h2>
                            <pre className="p-2 bg-black rounded border border-zinc-800 overflow-auto">
                                {JSON.stringify(user.user_metadata, null, 2)}
                            </pre>
                        </div>
                    </>
                )}

                {error && (
                    <div>
                        <h2 className="text-red-500 mb-1">Error</h2>
                        <pre className="p-2 bg-red-950/50 text-red-200 rounded border border-red-900 overflow-auto">
                            {JSON.stringify(error, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    )
}
