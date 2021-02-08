import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-funcion',
  templateUrl: './card-funcion.component.html',
  styleUrls: ['./card-funcion.component.scss']
})
export class CardFuncionComponent implements OnInit {

 funcionalidades: funcionalidad[] = [
   {
     imgUrl: "https://mitienda.pe/_/img/como-funciona-1.png",
     titulo: "Eliges el plan que más te convenga",
     desc: "Tenemos 4 planes entre los que puedes elegir de acuerdo a tu necesidad. Procedes a pagar con tu tarjeta de crédito y la tienda se te habilitará de manera instantánea. Ingresas información de tu empresa y listo."
   },
   {
    imgUrl: "https://mitienda.pe/_/img/como-funciona-2.png",
    titulo: "Creas tu tienda virtual y lo personalizas",
    desc: "Es súper fácil. No necesitas saber de diseño o de programación. Con tu usuario y contraseña podrás acceder a una panel de control y modificar la tienda a tu antojo."
  },
  {
    imgUrl: "https://mitienda.pe/_/img/como-funciona-3.png",
    titulo: "Cargas tus productos",
    desc: "Ingresa al panel de control y empieza a agregar tus productos. Puedes cargar hasta 6 imágenes por producto. Recuerda usar buenas fotografías y una descripción atractiva. Podrás manejar tu stock, organizar tus productos por categorías y mucho más."
  },
  {
    imgUrl: "https://mitienda.pe/_/img/como-funciona-4.png",
    titulo: "Establece tus métodos de pago",
    desc: "Podrás acordar con tus clientes el metodo de pago."
  },
  {
    imgUrl: "https://mitienda.pe/_/img/como-funciona-5.png",
    titulo: "Determina tus zonas de reparto y tarifas de envío",
    desc: "Tu eliges a donde vas a repartir y a que precio. Puedes hacer envíos locales, nacionales o incluso al extranjero. El valor del envío se agregará al total del carrito de compras. También puedes habilitar el recojo en tienda gratis y envío grátis a partir de cierto monto."
  },
  {
    imgUrl: "https://mitienda.pe/_/img/como-funciona-6.png",
    titulo: "Consigue clientes",
    desc: "Este paso es muy importante. Por más atractiva que sea tu tienda, esta no venderá por si sola. Deberás atraer compradores como en cualquier negocio. Te recomendamos participar en redes sociales, enviar correos electrónicos, compartir videos, escribir un blog, hacer publicidad, etc…"
  },
  {
    imgUrl: "https://mitienda.pe/_/img/como-funciona-7.png",
    titulo: "Tus clientes te compran",
    desc: "Quienes instalen tu aplicativo podrán ver tu catálogo de productos, filtrar por categorías, agregar los productos deseados a un carrito de compras y proceder a pagar de acuerdo a las zona de reparto y formas de pago que hayas establecido."
  },
  {
    imgUrl: "https://mitienda.pe/_/img/como-funciona-8.png",
    titulo: "Serás notificado",
    desc: "Tenemos 4 planes entre los que puedes elegir de acuerdo a tu necesidad. Procedes a pagar con tu tarjeta de crédito y la tienda se te habilitará de manera instantánea. Ingresas información de tu empresa y listo."
  },
  {
    imgUrl: "https://mitienda.pe/_/img/como-funciona-9.png",
    titulo: "Verifica los pagos",
    desc: "Una vez notificado verifica que el pago se haya realizado con éxito. Revisa la calificación de riesgo de fraude y asegúrate de que se trate de una operación legítima. Es muy fácil y te dará mayor seguridad."
  },
  {
    imgUrl: "https://mitienda.pe/_/img/como-funciona-10.png",
    titulo: "Despacha la mercadería",
    desc: "Ya sólo queda enviar la mercadería. Puedes hacerlo tu mismo o utilizar el servicio de mensajería que más te guste. Este paso es muy delicado, pues el mensajero será el único que tendrá contacto presencial con tu cliente. Asegúrate de que sea muy profesional."
  },
  {
    imgUrl: "https://mitienda.pe/_/img/como-funciona-11.png",
    titulo: "Cuida a tu cliente",
    desc: "Ponte en contacto con él, pregúntale si está contento con su compra, cómo recibió el producto, si llegó a tiempo, en buen estado y si el repartidor fue amable. A tus clientes frecuentes puedes enviarles ofertas especiales y cupones de descuento. La mejor publicidad es la que hacen los clientes satisfechos."
  },
 ]

  constructor() { }

  ngOnInit(): void {
  }

}

export interface funcionalidad {
  imgUrl: string,
  titulo: string,
  desc: string
}
