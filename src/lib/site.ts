export const SITE = {
  name: "Novo Anjo Farma",
  phones: ["921 482 188", "921 482 678"],
  whatsapp: "244921482188",
  email: "novoanjofarma@gmail.com",
  nif: "5002646323",
  registry: "30465-25/250824",
  mapsQuery: "Avenida Fidel de Castro Ruz, Bairro Dala Mulemba, Cacuaco, Luanda",
};

export const waLink = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
