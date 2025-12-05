'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDropzone } from 'react-dropzone'
import { Loader2, Upload, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { createProduct } from '@/actions/create-product'
import { ProductFormValues, productSchema } from '@/lib/schemas'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const CATEGORIES = [
    'T-Shirts',
    'Jackets',
    'Pants',
    'Hoodies',
    'Accessories',
    'Footwear',
]

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function ProductForm() {
    const [isUploading, setIsUploading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const form = useForm<any>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            category: '',
            inventory: 0,
            images: [],
            sizes: [],
        },
    })

    const supabase = createClient()

    const onDrop = async (acceptedFiles: File[]) => {
        setIsUploading(true)
        try {
            const newImages = []
            for (const file of acceptedFiles) {
                const fileExt = file.name.split('.').pop()
                const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
                const filePath = `${fileName}`

                const { error: uploadError } = await supabase.storage
                    .from('products')
                    .upload(filePath, file)

                if (uploadError) throw uploadError

                const { data: { publicUrl } } = supabase.storage
                    .from('products')
                    .getPublicUrl(filePath)

                newImages.push(publicUrl)
            }

            const currentImages = form.getValues('images')
            form.setValue('images', [...currentImages, ...newImages], { shouldValidate: true })
        } catch (error) {
            console.error('Error uploading image:', error)
            toast.error('Error uploading image')
        } finally {
            setIsUploading(false)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp']
        },
        disabled: isUploading
    })

    const removeImage = (index: number) => {
        const currentImages = form.getValues('images')
        const newImages = currentImages.filter((_: string, i: number) => i !== index)
        form.setValue('images', newImages, { shouldValidate: true })
    }

    async function onSubmit(data: ProductFormValues) {
        setIsSubmitting(true)
        try {
            const result = await createProduct(data)
            if (result?.error) {
                toast.error(result.error)
            } else {
                toast.success("Product created successfully")
                router.push('/admin/products')
                router.refresh()
            }
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto border-zinc-800 bg-zinc-950 text-zinc-100">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Neon Cyber Tee" {...field} className="bg-zinc-900 border-zinc-800" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe the product..."
                                            className="min-h-[100px] bg-zinc-900 border-zinc-800"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price (₹)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} value={field.value as number} className="bg-zinc-900 border-zinc-800" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="inventory"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Inventory Stock</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} value={field.value as number} className="bg-zinc-900 border-zinc-800" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-zinc-900 border-zinc-800">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-zinc-900 border-zinc-800">
                                            {CATEGORIES.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="sizes"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Sizes</FormLabel>
                                        <FormDescription>
                                            Select the available sizes for this product.
                                        </FormDescription>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {SIZES.map((size) => (
                                            <FormField
                                                key={size}
                                                control={form.control}
                                                name="sizes"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={size}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <div
                                                                    className={`cursor-pointer px-3 py-1 border rounded-md text-sm transition-colors ${field.value?.includes(size)
                                                                        ? 'bg-zinc-100 text-zinc-900 border-zinc-100 font-medium'
                                                                        : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-400'
                                                                        }`}
                                                                    onClick={() => {
                                                                        const current = field.value || []
                                                                        if (current.includes(size)) {
                                                                            field.onChange(current.filter((value: string) => value !== size))
                                                                        } else {
                                                                            field.onChange([...current, size])
                                                                        }
                                                                    }}
                                                                >
                                                                    {size}
                                                                </div>
                                                            </FormControl>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Images</FormLabel>
                                    <FormControl>
                                        <div className="space-y-4">
                                            <div
                                                {...getRootProps()}
                                                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/10' : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/50'
                                                    }`}
                                            >
                                                <input {...getInputProps()} />
                                                <div className="flex flex-col items-center gap-2">
                                                    <Upload className="h-8 w-8 text-zinc-400" />
                                                    <p className="text-sm text-zinc-400">
                                                        {isUploading ? 'Uploading...' : 'Drag & drop images here, or click to select'}
                                                    </p>
                                                </div>
                                            </div>

                                            {field.value.length > 0 && (
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {field.value.map((url: string, index: number) => (
                                                        <div key={url} className="relative group aspect-square rounded-md overflow-hidden border border-zinc-800">
                                                            <Image
                                                                src={url}
                                                                alt={`Product image ${index + 1}`}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeImage(index)}
                                                                className="absolute top-1 right-1 bg-black/50 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <X className="h-4 w-4 text-white" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isSubmitting || isUploading}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating Product...
                                </>
                            ) : (
                                'Create Product'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
