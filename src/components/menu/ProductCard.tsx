import type { Product } from '../../types';
import { urlFor } from '../../lib/sanity'; // Ajusta según tu estructura de lib
import { addCartItem } from '../../store/cart';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Flame, Plus } from "lucide-react";

interface Props {
    product: Product;
}

export function ProductCard({ product }: Props) {
    return (
        <Card className="bg-slate-900 border-2 border-orange-600/50 hover:border-orange-500 shadow-lg hover:shadow-orange-500/20 transition-all duration-300 flex flex-col h-full text-white overflow-hidden group">

            {/* Imagen Header */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={urlFor(product.image).width(400).height(300).url()}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80" />
            </div>

            <CardHeader className="relative -mt-12 pb-2 z-10">
                <div className="flex justify-between items-end">
                    <CardTitle className="font-['Bebas_Neue'] text-3xl tracking-wide text-orange-500">
                        {product.name}
                    </CardTitle>
                    <span className="bg-orange-600 text-white px-2 py-1 rounded font-bold text-sm shadow-md">
                        ${product.price}
                    </span>
                </div>
            </CardHeader>

            <CardContent className="flex-grow pt-0">
                {product.description && (
                    <Accordion type="single" collapsible className="w-full border-none">
                        <AccordionItem value="ingredients" className="border-none">
                            <AccordionTrigger className="text-orange-400/80 hover:text-orange-400 py-1 text-xs uppercase tracking-wider font-bold">
                                Ver Ingredientes
                            </AccordionTrigger>
                            <AccordionContent className="text-slate-400 text-xs italic pl-2 border-l-2 border-orange-800">
                                {product.description}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )}
            </CardContent>

            <CardFooter className="pt-2">
                <Button
                    onClick={() => addCartItem(product)}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 font-bold uppercase tracking-widest"
                >
                    <Plus className="mr-2 h-4 w-4" /> Agregar
                </Button>
            </CardFooter>
        </Card>
    );
}