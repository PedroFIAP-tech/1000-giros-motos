/**
 * Estoque mockado (espelha o Claude Design). Quando o banco entrar, só este
 * arquivo muda: as páginas consomem os helpers do fim do arquivo.
 */

export type MotoTipo = "Street" | "Naked" | "Trail" | "Scooter" | "Esportiva";
export type MotoStatus = "disponivel" | "reservada" | "vendida";

/** Foto da galeria. Sem `src`, vira o placeholder listrado do design. */
export type GalleryItem =
  | { src: string; position?: string; zoom?: number }
  | { placeholder: string };

export type Moto = {
  slug: string;
  marca: string;
  modelo: string;
  ano: number;
  anoModelo: number;
  km: number;
  preco: number;
  /** Foto do card. */
  imagem: string;
  /** Selo vermelho no card ("Destaque", "Baixo km"...). */
  selo?: string;
  tipo: MotoTipo;
  cilindrada: number;
  cor: string;
  combustivel: string;
  cambio: string;
  partida: string;
  freios: string;
  finalPlaca: string;
  descricao: string;
  opcionais: string[];
  galeria: GalleryItem[];
  status: MotoStatus;
  /** Data de entrada no estoque (ordenação "Mais novas"). */
  chegada: string;
};

const placeholders: GalleryItem[] = [
  { placeholder: "foto: painel" },
  { placeholder: "foto: lateral esq." },
];

function galeria(src: string): GalleryItem[] {
  return [
    { src, position: "center", zoom: 1 },
    { src, position: "30% 60%", zoom: 1.6 },
    { src, position: "80% 40%", zoom: 1.8 },
    ...placeholders,
  ];
}

const padrao = {
  combustivel: "Gasolina",
  partida: "Elétrica",
  status: "disponivel",
} as const;

export const motos: Moto[] = [
  {
    ...padrao,
    slug: "honda-cb-500f-2023",
    marca: "Honda",
    modelo: "CB 500F",
    ano: 2023,
    anoModelo: 2023,
    km: 8200,
    preco: 37900,
    imagem: "/images/motos/cb500.png",
    selo: "Destaque",
    tipo: "Naked",
    cilindrada: 471,
    cor: "Vermelho",
    cambio: "Manual, 6 marchas",
    freios: "Disco c/ ABS",
    finalPlaca: "7",
    descricao:
      "CB 500F impecável, único dono, todas as revisões feitas em concessionária. Pneus com mais de 80% de vida útil, kit relação novo e manual + chave reserva. Moto passou pela nossa vistoria de 120 itens e sai com garantia de motor e câmbio.",
    opcionais: [
      "Freios ABS",
      "Painel digital",
      "Farol full LED",
      "Manual e chave reserva",
      "Protetor de motor",
      "Pneus 80%+",
      "Kit relação novo",
      "Único dono",
    ],
    galeria: galeria("/images/hero-moto.png"),
    chegada: "2026-10-10",
  },
  {
    ...padrao,
    slug: "yamaha-mt-03-2022",
    marca: "Yamaha",
    modelo: "MT-03",
    ano: 2022,
    anoModelo: 2022,
    km: 12400,
    preco: 28900,
    imagem: "/images/motos/mt03.png",
    tipo: "Naked",
    cilindrada: 321,
    cor: "Azul",
    cambio: "Manual, 6 marchas",
    freios: "Disco c/ ABS",
    finalPlaca: "3",
    descricao:
      "MT-03 muito bem conservada, revisões em dia e pneus em ótimo estado. Passou pela nossa vistoria de 120 itens e sai com garantia de motor e câmbio.",
    opcionais: ["Freios ABS", "Painel digital", "Farol full LED", "Manual e chave reserva"],
    galeria: galeria("/images/motos/mt03.png"),
    chegada: "2026-10-08",
  },
  {
    ...padrao,
    slug: "honda-xre-300-2023",
    marca: "Honda",
    modelo: "XRE 300",
    ano: 2023,
    anoModelo: 2023,
    km: 5600,
    preco: 29900,
    imagem: "/images/motos/xre300.png",
    selo: "Baixo km",
    tipo: "Trail",
    cilindrada: 291,
    cor: "Branco",
    cambio: "Manual, 5 marchas",
    freios: "Disco c/ ABS",
    finalPlaca: "1",
    descricao:
      "XRE 300 com baixa quilometragem, pronta para cidade e estrada de terra. Revisada, documentação em dia e garantia de motor e câmbio.",
    opcionais: ["Freios ABS", "Painel digital", "Protetor de motor", "Único dono"],
    galeria: galeria("/images/motos/xre300.png"),
    chegada: "2026-10-05",
  },
  {
    ...padrao,
    slug: "kawasaki-z-400-2022",
    marca: "Kawasaki",
    modelo: "Z 400",
    ano: 2022,
    anoModelo: 2022,
    km: 9800,
    preco: 33900,
    imagem: "/images/motos/z400.png",
    tipo: "Naked",
    cilindrada: 399,
    cor: "Verde",
    cambio: "Manual, 6 marchas",
    freios: "Disco c/ ABS",
    finalPlaca: "5",
    descricao:
      "Z 400 com manutenção em dia, escapamento original e pneus novos. Vistoriada em 120 itens e com garantia de motor e câmbio.",
    opcionais: ["Freios ABS", "Farol full LED", "Pneus novos", "Manual e chave reserva"],
    galeria: galeria("/images/motos/z400.png"),
    chegada: "2026-10-02",
  },
  {
    ...padrao,
    slug: "honda-cg-160-titan-2024",
    marca: "Honda",
    modelo: "CG 160 Titan",
    ano: 2024,
    anoModelo: 2024,
    km: 1200,
    preco: 18900,
    imagem: "/images/motos/cg160.png",
    selo: "Nova chegada",
    tipo: "Street",
    cilindrada: 160,
    cor: "Vermelho",
    combustivel: "Flex",
    cambio: "Manual, 5 marchas",
    freios: "Disco dianteiro c/ CBS",
    finalPlaca: "9",
    descricao:
      "CG 160 Titan praticamente zero, com apenas 1.200 km. Ideal para o dia a dia, econômica e com garantia de fábrica.",
    opcionais: ["Painel digital", "Farol full LED", "Manual e chave reserva", "Único dono"],
    galeria: galeria("/images/motos/cg160.png"),
    chegada: "2026-09-28",
  },
  {
    ...padrao,
    slug: "honda-cb-500f-2021",
    marca: "Honda",
    modelo: "CB 500F",
    ano: 2021,
    anoModelo: 2021,
    km: 21300,
    preco: 33500,
    imagem: "/images/motos/cb500.png",
    tipo: "Naked",
    cilindrada: 471,
    cor: "Preto",
    cambio: "Manual, 6 marchas",
    freios: "Disco c/ ABS",
    finalPlaca: "2",
    descricao:
      "CB 500F com histórico de revisões, pneus em bom estado e documentação em dia. Vistoriada em 120 itens.",
    opcionais: ["Freios ABS", "Painel digital", "Protetor de motor"],
    galeria: galeria("/images/motos/cb500.png"),
    chegada: "2026-09-24",
  },
  {
    ...padrao,
    slug: "yamaha-mt-03-2021",
    marca: "Yamaha",
    modelo: "MT-03",
    ano: 2021,
    anoModelo: 2021,
    km: 18700,
    preco: 26400,
    imagem: "/images/motos/mt03.png",
    tipo: "Naked",
    cilindrada: 321,
    cor: "Cinza",
    cambio: "Manual, 6 marchas",
    freios: "Disco c/ ABS",
    finalPlaca: "8",
    descricao:
      "MT-03 revisada, com kit relação novo e manual do proprietário. Vistoriada em 120 itens.",
    opcionais: ["Freios ABS", "Kit relação novo", "Manual e chave reserva"],
    galeria: galeria("/images/motos/mt03.png"),
    chegada: "2026-09-20",
  },
  {
    ...padrao,
    slug: "kawasaki-z-400-2023",
    marca: "Kawasaki",
    modelo: "Z 400",
    ano: 2023,
    anoModelo: 2023,
    km: 4100,
    preco: 36900,
    imagem: "/images/motos/z400.png",
    tipo: "Naked",
    cilindrada: 399,
    cor: "Verde",
    cambio: "Manual, 6 marchas",
    freios: "Disco c/ ABS",
    finalPlaca: "4",
    descricao:
      "Z 400 seminova, baixa quilometragem e único dono. Revisões feitas em concessionária e garantia de motor e câmbio.",
    opcionais: ["Freios ABS", "Farol full LED", "Único dono", "Manual e chave reserva"],
    galeria: galeria("/images/motos/z400.png"),
    chegada: "2026-09-16",
  },
  {
    ...padrao,
    slug: "honda-xre-300-2021",
    marca: "Honda",
    modelo: "XRE 300",
    ano: 2021,
    anoModelo: 2021,
    km: 27900,
    preco: 24900,
    imagem: "/images/motos/xre300.png",
    tipo: "Trail",
    cilindrada: 291,
    cor: "Vermelho",
    cambio: "Manual, 5 marchas",
    freios: "Disco c/ ABS",
    finalPlaca: "6",
    descricao:
      "XRE 300 pronta para viagem, com protetor de motor e pneus de uso misto. Vistoriada em 120 itens.",
    opcionais: ["Freios ABS", "Protetor de motor", "Pneus de uso misto"],
    galeria: galeria("/images/motos/xre300.png"),
    chegada: "2026-09-12",
  },
];

/* ---------- Opções dos filtros (como no design) ---------- */

export const marcas = ["Honda", "Yamaha", "Kawasaki", "Suzuki", "BMW", "Triumph"];
export const tipos: MotoTipo[] = ["Street", "Naked", "Trail", "Scooter", "Esportiva"];
export const faixasCilindrada = [
  { label: "Até 160cc", min: 0, max: 160 },
  { label: "161–300cc", min: 161, max: 300 },
  { label: "301–500cc", min: 301, max: 500 },
  { label: "500cc+", min: 501, max: Infinity },
];

/* ---------- Helpers ---------- */

export function motoNome(moto: Pick<Moto, "marca" | "modelo">) {
  return `${moto.marca} ${moto.modelo}`;
}

export function getMotos() {
  return motos;
}

export function getMoto(slug: string) {
  return motos.find((moto) => moto.slug === slug);
}

/** "Você também pode gostar": as de preço mais próximo. */
export function getSimilares(moto: Moto, limit = 4) {
  return motos
    .filter((m) => m.slug !== moto.slug && m.status === "disponivel")
    .sort((a, b) => Math.abs(a.preco - moto.preco) - Math.abs(b.preco - moto.preco))
    .slice(0, limit);
}

/** Destaques da home, na ordem de chegada. */
export function getDestaques(limit = 5) {
  const seen = new Set<string>();
  return motos
    .filter((m) => {
      const key = motoNome(m);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}
