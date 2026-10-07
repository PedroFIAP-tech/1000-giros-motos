/**
 * Dados da loja. Fonte única: qualquer telefone, endereço ou link de rede
 * social exibido no site deve vir daqui.
 */
export const siteConfig = {
  name: "1000 Giros Motos",
  shortName: "1000 Giros",
  description:
    "Motos seminovas selecionadas, com procedência e atendimento especializado. Financiamento, seguro, consignação e avaliação em Itapecerica da Serra - SP.",

  whatsapp: {
    /** Somente dígitos, com DDI + DDD (formato exigido pelo wa.me). */
    number: "5511960388509",
    display: "(11) 96038-8509",
    defaultMessage:
      "Olá! Vim pelo site da 1000 Giros Motos e gostaria de mais informações.",
  },

  phone: {
    display: "(11) 96038-8509",
    href: "tel:+5511960388509",
  },

  address: {
    street: "Rodovia Salvador de Leone, 2030",
    neighborhood: "Embu Mirim",
    city: "Itapecerica da Serra",
    state: "SP",
    zip: "06853-000",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Rodovia+Salvador+de+Leone,+2030,+Itapecerica+da+Serra+-+SP",
  },

  // TODO: substituir pelos links reais das redes sociais.
  social: {
    instagram: "#",
    facebook: "#",
    youtube: "#",
  },
} as const;

export const fullAddress = `${siteConfig.address.street} - ${siteConfig.address.neighborhood}, ${siteConfig.address.city} - ${siteConfig.address.state}, ${siteConfig.address.zip}`;
