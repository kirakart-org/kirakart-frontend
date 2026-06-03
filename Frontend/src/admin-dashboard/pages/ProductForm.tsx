import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { productsApi } from "@/api/products"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

const productSchema = z.object({
    name: z.string().min(2, {
        message: "Product name must be at least 2 characters.",
    }),
    description: z.string().optional(),
    price: z.string().min(1, { message: "Price is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    occasions: z.array(z.string()).min(1, { message: "At least one occasion is required" }), // Changed to array
    stock: z.string().min(1, { message: "Stock is required" }), // Map to in_stock boolean or keep as count? Backend has in_stock bool, but form asks for number. Let's assume we want to just toggle in_stock for now or send a dummy count if needed, but the model has in_stock boolean. The form has stock input. Let's treat it as in_stock for now or simply omit if backend allows. Wait, backend model has `in_stock = models.BooleanField(default=True)`. It does NOT have a stock count. So I should probably change this input to a switch or just drop it. For now, let's keep it but maybe not use it directly or map it to in_stock. actually, I'll modify the form to match backend fields better.
    // Backend fields: color, material, fabric, length
    color: z.string().min(1, { message: "Color is required" }),
    material: z.string().optional(),
    fabric: z.string().optional(),
    length: z.string().optional(),
    status: z.enum(["active", "draft", "archived"]),
})

export default function ProductForm() {
    const { id } = useParams()
    const isEditMode = !!id
    const navigate = useNavigate()
    const { toast } = useToast()
    const [categories, setCategories] = useState<{ id: number, name: string }[]>([])
    const [occasions, setOccasions] = useState<{ id: number, name: string }[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cats, occs] = await Promise.all([
                    productsApi.getCategories(),
                    productsApi.getOccasions()
                ])
                setCategories(cats)
                setOccasions(occs)
            } catch (error) {
                console.error("Failed to load form data", error)
                toast({
                    title: "Error",
                    description: "Failed to load categories or occasions",
                    variant: "destructive",
                })
            }
        }
        fetchData()
    }, [toast])

    // 1. Define your form.
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            category: "", // expects ID as string
            occasions: [], // expects array of IDs as strings
            stock: "1", // Default to 1 to imply in stock
            color: "",
            material: "",
            fabric: "",
            length: "",
            status: "draft",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof productSchema>) {
        try {
            const payload = {
                name: values.name,
                description: values.description,
                price: parseFloat(values.price),
                category: parseInt(values.category),
                occasions: values.occasions.map(id => parseInt(id)),
                color: values.color,
                material: values.material,
                fabric: values.fabric,
                length: values.length,
                in_stock: parseInt(values.stock) > 0,
                // defaults
                rating: 0,
                reviews_count: 0,
                trending: false,
                low_stock: false,
                most_ordered: false,
                blouse_included: true
            }

            if (isEditMode && id) {
                await productsApi.update(id, payload)
                toast({ title: "Success", description: "Product updated successfully" })
            } else {
                await productsApi.create(payload)
                toast({ title: "Success", description: "Product created successfully" })
            }

            navigate("/admin/products")
        } catch (error) {
            console.error(error)
            toast({
                title: "Error",
                description: "Failed to save product",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link to="/admin/products"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight">
                        {isEditMode ? "Edit Product" : "Add New Product"}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {isEditMode ? `Updating product #${id}` : "Create a new product for your store"}
                    </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="outline">Save Draft</Button>
                    <Button onClick={form.handleSubmit(onSubmit)}>
                        <Save className="mr-2 h-4 w-4" /> Save Product
                    </Button>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Kanjivaram Silk Saree" {...field} />
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
                                                <Textarea placeholder="Product description..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="color"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Color</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. Red" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="material"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Material</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. Silk" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="fabric"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Fabric</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. Banarasi" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="length"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Length</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. 6.3m" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Pricing & Inventory</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price (₹)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="0.00" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="stock"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Stock (Quantity)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="0" {...field} />
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
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories.map(cat => (
                                                        <SelectItem key={cat.id} value={cat.id.toString()}>
                                                            {cat.name}
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
                                    name="occasions"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Occasions</FormLabel>
                                            <Select
                                                onValueChange={(value) => field.onChange([value])} // Simplified for single select UI but stores as array. Ideally multi-select.
                                                defaultValue={field.value?.[0]}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select primary occasion" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {occasions.map(occ => (
                                                        <SelectItem key={occ.id} value={occ.id.toString()}>
                                                            {occ.name}
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
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="draft">Draft</SelectItem>
                                                    <SelectItem value="archived">Archived</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </Form>
        </div>
    )
}
