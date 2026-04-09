import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { $cart, $totalPrice, $totalQuantity, addCartItem, removeCartItem, sendOrderToWebhook } from '../../store/cart';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { ShoppingCart, Flame, Minus, Plus, Trash2 } from "lucide-react";

export function CartDialog() {
  const cartItems = useStore($cart);
  const totalQty = useStore($totalQuantity);
  const total = useStore($totalPrice);
  const items = Object.values(cartItems);

  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmOrder = async () => {
    if (!phone.trim()) {
      alert('Por favor ingresa tu número de teléfono');
      return;
    }
    
    setIsLoading(true);
    try {
      const respuesta = await sendOrderToWebhook(phone);
      
      if (respuesta.status === 'success') {
        window.location.href = respuesta.url;
      } else if (respuesta.status === 'error') {
        alert(respuesta.message);
      } else {
        alert('Respuesta inesperada del servidor');
      }
    } catch (error) {
      console.error(error);
      alert('Hubo un error al procesar el pedido. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-orange-600 hover:bg-orange-500 border-4 border-slate-900 shadow-xl z-50 transition-transform hover:scale-105">
          <div className="relative">
            <ShoppingCart className="h-8 w-8 text-white" />
            {totalQty > 0 && (
              <span className="absolute -top-3 -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-red-900">
                {totalQty}
              </span>
            )}
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-slate-950 border-orange-800 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-orange-500 uppercase">
            <Flame className="text-red-500" /> Tu Pedido
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[300px] w-full rounded-md border border-slate-800 bg-slate-900/50 p-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-slate-500">
              <ShoppingCart className="mb-2 h-12 w-12 opacity-20" />
              <p>El carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item._id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-200">{item.name}</h4>
                    <p className="text-sm text-slate-400">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-orange-400" onClick={() => removeCartItem(item._id)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-4 text-center text-sm font-bold">{item.quantity}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-orange-400" onClick={() => addCartItem(item)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <DialogFooter className="flex-col gap-3 sm:justify-between">
          <div className="flex flex-col gap-3 w-full border-t border-slate-800 pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-orange-400">${total.toFixed(2)}</span>
            </div>
            
            {items.length > 0 && (
              <input
                type="tel"
                placeholder="Tu número de teléfono (ej. 04121234567)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-md border border-slate-700 bg-slate-900 p-3 text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            )}
            
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold uppercase transition-all"
              disabled={items.length === 0 || isLoading || !phone.trim()}
              onClick={handleConfirmOrder}
            >
              {isLoading ? 'Cargando...' : 'Confirmar Pedido'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}