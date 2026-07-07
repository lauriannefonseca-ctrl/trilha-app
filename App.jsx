import React, { useState, useEffect, useCallback } from "react";
import {
  Flame, Star, Search, Home, Clock, BookOpen, LayoutGrid, Target,
  Play, Lock, Check, ChevronLeft, Compass, Sparkles
} from "lucide-react";

const FONT_LINK_ID = "trilha-fonts";

function useFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_LINK_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_LINK_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Public+Sans:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

const TRACKS = [
  {
    id: "pessoal",
    name: "Evolução Pessoal",
    tagline: "hábitos e mentalidade",
    icon: Compass,
    color: "#7A2E2E",
    topics: [
      {
        id: "p1",
        title: "O poder dos pequenos hábitos",
        lesson:
          "Hábitos pequenos e repetidos moldam mais o seu futuro do que grandes esforços ocasionais. Um hábito de 2 minutos, feito todo dia, cria identidade — você deixa de 'tentar ler' e passa a 'ser alguém que lê'.",
        question: "Qual é a principal vantagem de um hábito pequeno sobre uma grande mudança pontual?",
        options: [
          "É mais fácil de sustentar no longo prazo",
          "Gera resultado imediato e visível",
          "Não exige nenhuma disciplina",
          "Substitui a necessidade de metas",
        ],
        correct: 0,
      },
      {
        id: "p2",
        title: "Mentalidade de crescimento",
        lesson:
          "Pessoas com mentalidade de crescimento entendem habilidade como algo treinável, não fixo. Erros deixam de ser prova de incapacidade e passam a ser dado sobre o que ainda falta praticar.",
        question: "Na mentalidade de crescimento, um erro é interpretado principalmente como:",
        options: [
          "Prova de que falta talento",
          "Informação sobre o que treinar a seguir",
          "Motivo para desistir",
          "Um problema de sorte",
        ],
        correct: 1,
      },
      {
        id: "p3",
        title: "Gestão do tempo com foco",
        lesson:
          "Tempo não gerenciado tende a ser tomado pelo mais urgente, não pelo mais importante. Bloquear intervalos fixos do dia para uma única tarefa protege o que realmente importa da interrupção constante.",
        question: "Por que reservar blocos fixos de tempo ajuda mais do que apenas fazer uma lista de tarefas?",
        options: [
          "Porque elimina totalmente distrações externas",
          "Porque protege o importante da urgência do dia",
          "Porque garante mais horas de trabalho",
          "Porque dispensa qualquer planejamento",
        ],
        correct: 1,
      },
      {
        id: "p4",
        title: "Autoconhecimento e valores",
        lesson:
          "Decisões ficam mais fáceis quando você sabe quais valores guiam sua vida. Sem clareza sobre o que importa, cada escolha vira uma negociação do zero, gastando energia mental repetida.",
        question: "Ter valores claros ajuda principalmente a:",
        options: [
          "Evitar qualquer conflito com outras pessoas",
          "Tomar decisões com menos desgaste mental",
          "Garantir sucesso financeiro",
          "Eliminar a necessidade de refletir",
        ],
        correct: 1,
      },
      {
        id: "p5",
        title: "Resiliência emocional",
        lesson:
          "Resiliência não é ausência de dificuldade, é a capacidade de se recuperar dela. Isso se treina reconhecendo a emoção sem julgá-la e voltando à ação em passos pequenos, não com força de vontade bruta.",
        question: "Resiliência emocional é melhor descrita como:",
        options: [
          "Nunca sentir tristeza ou frustração",
          "A capacidade de se recuperar da dificuldade",
          "Ignorar completamente as emoções",
          "Um traço de personalidade fixo de nascença",
        ],
        correct: 1,
      },
      {
        id: "p6",
        title: "Comunicação assertiva",
        lesson:
          "Comunicação assertiva expressa uma necessidade com clareza, sem agressividade nem submissão. A estrutura 'quando X acontece, eu sinto Y, e preciso de Z' costuma reduzir mal-entendidos em conversas difíceis.",
        question: "O que caracteriza a comunicação assertiva, diferente da agressiva ou submissa?",
        options: [
          "Evitar falar sobre o problema",
          "Impor a própria opinião a qualquer custo",
          "Expressar a necessidade com clareza e respeito",
          "Concordar sempre para evitar conflito",
        ],
        correct: 2,
      },
      {
        id: "p7",
        title: "Definindo metas SMART",
        lesson:
          "Uma meta vaga como 'ficar em forma' raramente vira ação. Metas específicas, mensuráveis e com prazo definido — como 'correr 3km em 6 semanas' — dão ao cérebro um alvo concreto para planejar em torno dele.",
        question: "Por que uma meta específica funciona melhor do que uma meta vaga?",
        options: [
          "Porque é sempre mais fácil de alcançar",
          "Porque dá ao cérebro um alvo concreto para planejar",
          "Porque não exige nenhum esforço",
          "Porque garante motivação constante",
        ],
        correct: 1,
      },
      {
        id: "p8",
        title: "Disciplina vs motivação",
        lesson:
          "Motivação é instável, varia com o humor e o dia. Disciplina é o sistema que continua funcionando quando a motivação some — por isso quem depende só de motivação tende a parar assim que ela cai.",
        question: "Qual a diferença essencial entre disciplina e motivação?",
        options: [
          "São a mesma coisa com nomes diferentes",
          "Disciplina é um sistema estável; motivação é instável",
          "Motivação dura mais tempo que disciplina",
          "Disciplina depende do humor do dia",
        ],
        correct: 1,
      },
      {
        id: "p9",
        title: "Procrastinação e a lei do menor esforço",
        lesson:
          "O cérebro tende a escolher a ação mais fácil disponível, não a mais importante. Reduzir o atrito de começar — deixar o tênis separado, abrir o documento antes de dormir — costuma vencer mais procrastinação do que força de vontade.",
        question: "O que costuma reduzir mais a procrastinação, segundo o texto?",
        options: ["Força de vontade pura", "Reduzir o atrito para começar a tarefa", "Esperar motivação chegar", "Aumentar a cobrança sobre si mesmo"],
        correct: 1,
      },
      {
        id: "p10",
        title: "Gratidão como prática diária",
        lesson:
          "Anotar 3 coisas específicas pelas quais você é grato todo dia treina o cérebro a notar o positivo com mais facilidade. Não é ignorar problemas, é balancear a atenção que naturalmente pende para o que falta.",
        question: "Qual é o efeito de praticar gratidão diariamente?",
        options: ["Ignorar todos os problemas reais", "Treinar o cérebro a notar o positivo também", "Eliminar completamente a tristeza", "Não tem nenhum efeito comprovado"],
        correct: 1,
      },
      {
        id: "p11",
        title: "Zona de conforto e crescimento",
        lesson:
          "Crescimento acontece numa zona de leve desconforto, nem tão fácil que não desafia, nem tão difícil que paralisa. Encontrar esse ponto intermediário é mais produtivo do que evitar desconforto ou buscar o extremo.",
        question: "Onde o crescimento tende a acontecer, segundo o texto?",
        options: ["Só na zona de conforto total", "Numa zona de leve desconforto", "Apenas em situações extremas", "Crescimento não depende de desconforto"],
        correct: 1,
      },
      {
        id: "p12",
        title: "Autocompaixão vs autocrítica",
        lesson:
          "Autocrítica dura reduz motivação e aumenta a chance de desistir após um erro. Autocompaixão — tratar-se com a mesma gentileza que se ofereceria a um amigo — mantém a pessoa engajada em tentar de novo.",
        question: "O que a autocompaixão favorece, segundo o texto?",
        options: ["Desistência mais rápida", "Continuar tentando após um erro", "Menos responsabilidade pessoal", "Baixa autoestima"],
        correct: 1,
      },
      {
        id: "p13",
        title: "O poder do 'não'",
        lesson:
          "Cada 'sim' a um compromisso é um 'não' automático a outra coisa, geralmente ao seu próprio tempo e prioridades. Dizer não com clareza, sem se justificar demais, protege energia para o que já foi decidido como prioridade.",
        question: "Por que dizer 'não' é importante, segundo o texto?",
        options: ["Porque evita qualquer relacionamento", "Porque protege energia para as prioridades já definidas", "Porque é sempre a resposta certa", "Porque demonstra falta de educação"],
        correct: 1,
      },
      {
        id: "p14",
        title: "Rotina matinal poderosa",
        lesson:
          "As primeiras decisões do dia consomem menos força de vontade porque a mente ainda está descansada. Uma rotina matinal simples e fixa evita gastar essa energia limitada decidindo o que fazer a cada minuto.",
        question: "Por que a manhã é um bom momento para hábitos importantes?",
        options: ["Porque a força de vontade está mais disponível", "Porque não há nenhuma vantagem real", "Porque o corpo está mais cansado", "Porque não exige nenhuma disciplina"],
        correct: 0,
      },
      {
        id: "p15",
        title: "Foco em um objetivo por vez",
        lesson:
          "Tentar mudar vários hábitos ao mesmo tempo divide a força de vontade limitada disponível por dia. Focar em um objetivo até ele virar automático aumenta muito a chance de sucesso antes de somar o próximo.",
        question: "O que acontece quando se tenta mudar vários hábitos ao mesmo tempo?",
        options: ["A força de vontade disponível se divide e enfraquece", "O sucesso fica garantido", "Não há nenhum efeito", "Fica mais fácil manter todos"],
        correct: 0,
      },
      {
        id: "p16",
        title: "Aprendendo com o fracasso",
        lesson:
          "Fracasso vira aprendizado quando é analisado com curiosidade — o que exatamente não funcionou? — em vez de guardado apenas como vergonha. Times e pessoas que revisam erros abertamente evoluem mais rápido que os que evitam falar neles.",
        question: "O que transforma um fracasso em aprendizado, segundo o texto?",
        options: ["Evitar falar sobre ele", "Analisá-lo com curiosidade sobre o que não funcionou", "Guardar apenas como vergonha", "Repetir a mesma estratégia sem mudar nada"],
        correct: 1,
      },
      {
        id: "p17",
        title: "Escuta ativa",
        lesson:
          "Escutar ativamente é resistir ao impulso de já formular a resposta enquanto o outro ainda fala. Repetir com as próprias palavras o que foi entendido antes de responder reduz mal-entendidos e fortalece a conexão.",
        question: "O que caracteriza a escuta ativa, segundo o texto?",
        options: ["Formular a resposta enquanto o outro fala", "Confirmar o entendimento antes de responder", "Interromper para dar sua opinião", "Concordar sempre com tudo"],
        correct: 1,
      },
      {
        id: "p18",
        title: "Gestão de energia, não só tempo",
        lesson:
          "Duas horas de trabalho com energia alta rendem mais do que seis horas cansado. Prestar atenção aos picos naturais de energia do dia, e reservar tarefas importantes para eles, importa tanto quanto administrar o relógio.",
        question: "Segundo o texto, o que costuma importar tanto quanto administrar o tempo?",
        options: ["Administrar a energia disponível ao longo do dia", "Trabalhar o máximo de horas possível", "Ignorar o cansaço completamente", "Fazer tudo ao mesmo tempo"],
        correct: 0,
      },
      {
        id: "p19",
        title: "Minimalismo mental",
        lesson:
          "Excesso de escolhas triviais no dia a dia — o que vestir, o que comer — gasta uma reserva limitada de decisão que poderia ir para o que importa. Simplificar decisões pequenas libera espaço mental para as grandes.",
        question: "O que o minimalismo mental busca reduzir?",
        options: ["O número de decisões triviais no dia", "O número de amizades", "O tempo de sono", "A quantidade de metas"],
        correct: 0,
      },
      {
        id: "p20",
        title: "Constância acima de intensidade",
        lesson:
          "Uma prática moderada feita todos os dias supera, no longo prazo, esforços intensos e esporádicos. O corpo e a mente respondem melhor a estímulos regulares e previsíveis do que a picos seguidos de longas pausas.",
        question: "O que costuma vencer no longo prazo, segundo o texto?",
        options: ["Esforço intenso e esporádico", "Prática moderada e constante", "Nenhum dos dois faz diferença", "Fazer tudo de uma vez"],
        correct: 1,
      },
      {
        id: "p21",
        title: "Feedback como ferramenta de crescimento",
        lesson:
          "Feedback específico e a tempo — logo após a ação, não meses depois — muda comportamento muito mais do que elogio ou crítica genéricos. Pedir feedback ativamente, em vez de esperar que ele apareça, acelera o próprio desenvolvimento.",
        question: "Que tipo de feedback muda mais o comportamento, segundo o texto?",
        options: ["Genérico e tardio", "Específico e dado logo após a ação", "Apenas elogios vagos", "Feedback anônimo e sem contexto"],
        correct: 1,
      },
      {
        id: "p22",
        title: "Identidade vs resultado",
        lesson:
          "Focar só no resultado ('quero perder peso') gera motivação frágil. Focar em quem você quer se tornar ('sou alguém que cuida do corpo') sustenta o hábito mesmo quando o resultado demora a aparecer.",
        question: "O que sustenta um hábito por mais tempo, segundo o texto?",
        options: ["Focar apenas no resultado final", "Focar em uma identidade a ser construída", "Ignorar completamente as metas", "Mudar de objetivo toda semana"],
        correct: 1,
      },
      {
        id: "p23",
        title: "O ambiente molda o comportamento",
        lesson:
          "É mais fácil mudar o ambiente ao redor do que confiar apenas na força de vontade. Deixar frutas visíveis e doces fora de vista, por exemplo, muda escolhas sem exigir nenhuma decisão consciente extra.",
        question: "Segundo o texto, o que costuma ser mais eficaz que confiar só na força de vontade?",
        options: ["Ignorar o ambiente ao redor", "Ajustar o ambiente para facilitar a boa escolha", "Aumentar a autocrítica", "Depender só da motivação"],
        correct: 1,
      },
      {
        id: "p24",
        title: "Visualização e planejamento mental",
        lesson:
          "Imaginar em detalhe como e quando uma ação vai acontecer — não apenas o resultado desejado — aumenta a chance real de executá-la. Esse tipo de planejamento mental funciona como um ensaio que reduz hesitação na hora H.",
        question: "Qual visualização é mais eficaz, segundo o texto?",
        options: ["Imaginar apenas o resultado final desejado", "Imaginar em detalhe como e quando a ação vai ocorrer", "Não visualizar nada, só agir", "Visualizar o fracasso para se prevenir"],
        correct: 1,
      },
      {
        id: "p25",
        title: "Paciência e resultados de longo prazo",
        lesson:
          "A maioria dos resultados que valem a pena — saúde, carreira, relacionamentos — segue uma curva lenta no início e mais visível depois. Desistir cedo, antes da curva virar, é o motivo mais comum de abandono de bons hábitos.",
        question: "Segundo o texto, qual é o motivo mais comum de abandono de bons hábitos?",
        options: ["Falta de talento", "Desistir antes da curva de resultado virar visível", "Excesso de paciência", "Resultados aparecem rápido demais"],
        correct: 1,
      },
      {
        id: "p26",
        title: "Comparação social saudável",
        lesson:
          "Comparar-se com quem está muito à frente pode desanimar; comparar-se com quem está um passo à frente costuma inspirar ação prática. Usar a comparação como referência de próximo passo, não como veredito de valor pessoal, é mais saudável.",
        question: "Que tipo de comparação tende a ser mais útil, segundo o texto?",
        options: ["Com alguém muito distante do seu nível", "Com alguém um passo à frente, como referência prática", "Nenhuma comparação nunca ajuda", "Comparação constante com todos ao redor"],
        correct: 1,
      },
      {
        id: "p27",
        title: "Perdão e leveza emocional",
        lesson:
          "Perdoar não significa concordar com o que aconteceu, mas soltar o peso de carregar a mágoa constantemente. Pesquisas associam a prática do perdão a menos ansiedade e mais leveza emocional no dia a dia.",
        question: "O que o perdão significa, segundo o texto?",
        options: ["Concordar com o que aconteceu", "Soltar o peso de carregar a mágoa", "Esquecer que algo aconteceu", "Reatar a relação obrigatoriamente"],
        correct: 1,
      },
      {
        id: "p28",
        title: "Propósito e sentido de vida",
        lesson:
          "Ter um propósito claro — mesmo simples, como 'cuidar bem da minha família' — dá resiliência em dias difíceis porque ancora a ação em algo maior que o desconforto momentâneo. Sentido reduz a sensação de esforço vazio.",
        question: "O que um propósito claro oferece, segundo o texto?",
        options: ["Resiliência ancorada em algo maior que o momento", "Garantia de que nada dará errado", "Eliminação de qualquer esforço", "Um resultado imediato"],
        correct: 0,
      },
      {
        id: "p29",
        title: "Sono e desempenho mental",
        lesson:
          "Sono insuficiente prejudica foco, memória e regulação emocional tanto quanto álcool prejudica reflexos. Priorizar uma rotina de sono consistente costuma render mais desempenho do que qualquer técnica de produtividade isolada.",
        question: "Segundo o texto, sono insuficiente afeta principalmente:",
        options: ["Apenas a aparência física", "Foco, memória e regulação emocional", "Somente o apetite", "Nada de relevante no dia a dia"],
        correct: 1,
      },
      {
        id: "p30",
        title: "Revisão semanal de vida",
        lesson:
          "Reservar 15 minutos por semana para revisar o que funcionou, o que não funcionou e o que ajustar cria um ciclo de melhoria contínua. Sem essa pausa, é fácil repetir os mesmos erros piloto automático por meses.",
        question: "Qual é o benefício da revisão semanal, segundo o texto?",
        options: ["Nenhum, é perda de tempo", "Criar um ciclo de melhoria contínua", "Aumentar a autocrítica excessiva", "Substituir o planejamento diário"],
        correct: 1,
      },
    ],
  },
  {
    id: "geral",
    name: "Aprendizado Geral",
    tagline: "como aprender melhor",
    icon: BookOpen,
    color: "#2F5233",
    topics: [
      {
        id: "g1",
        title: "Como funciona a memória",
        lesson:
          "A memória não grava como uma câmera — ela reconstrói a informação toda vez que é lembrada. Por isso repetir em contextos diferentes fortalece a lembrança mais do que repetir sempre do mesmo jeito.",
        question: "Segundo o texto, a memória funciona principalmente:",
        options: [
          "Como uma gravação perfeita e fixa",
          "Reconstruindo a informação a cada lembrança",
          "Sem qualquer relação com repetição",
          "Apenas durante o sono",
        ],
        correct: 1,
      },
      {
        id: "g2",
        title: "Técnica Pomodoro",
        lesson:
          "A técnica Pomodoro divide o trabalho em blocos de 25 minutos de foco total, seguidos de uma pausa curta. O limite de tempo reduz a procrastinação porque a tarefa parece menos assustadora em blocos pequenos.",
        question: "Qual é o principal benefício de dividir o trabalho em blocos curtos de foco?",
        options: [
          "Aumenta o tempo total gasto na tarefa",
          "Reduz a procrastinação tornando a tarefa menos assustadora",
          "Elimina a necessidade de pausas",
          "Funciona apenas para tarefas físicas",
        ],
        correct: 1,
      },
      {
        id: "g3",
        title: "Repetição espaçada",
        lesson:
          "Revisar um conteúdo logo antes de esquecê-lo — não no dia seguinte nem meses depois — é o que mais fortalece a memória de longo prazo. Por isso apps de estudo aumentam o intervalo entre revisões aos poucos.",
        question: "O momento ideal para revisar um conteúdo, segundo a repetição espaçada, é:",
        options: [
          "Assim que você aprende, repetidamente no mesmo dia",
          "Pouco antes de você esquecê-lo",
          "Só quando já esqueceu tudo",
          "Nunca é necessário revisar",
        ],
        correct: 1,
      },
      {
        id: "g4",
        title: "Pensamento crítico",
        lesson:
          "Pensar criticamente é perguntar 'como eu sei disso?' antes de aceitar uma afirmação. Isso inclui checar a fonte, procurar evidências contrárias e distinguir opinião de fato verificável.",
        question: "Uma pergunta central do pensamento crítico é:",
        options: [
          "Quem disse isso é famoso?",
          "Como eu sei que isso é verdade?",
          "Isso confirma o que eu já pensava?",
          "Quantas pessoas concordam comigo?",
        ],
        correct: 1,
      },
      {
        id: "g5",
        title: "Como ler mais rápido",
        lesson:
          "Grande parte da lentidão na leitura vem de sub-vocalizar cada palavra mentalmente e de regredir o olhar para trechos já lidos. Ler em blocos de frase, não palavra por palavra, aumenta a velocidade sem perder compreensão.",
        question: "O que mais atrapalha a velocidade de leitura, segundo o texto?",
        options: [
          "Ler em blocos de frase",
          "Sub-vocalizar cada palavra e regredir o olhar",
          "Usar um dedo para guiar a leitura",
          "Ler em ambiente silencioso",
        ],
        correct: 1,
      },
      {
        id: "g6",
        title: "Mapas mentais",
        lesson:
          "Mapas mentais organizam informação em rede, com um tema central se ramificando em ideias relacionadas. Isso imita como o cérebro associa conceitos, facilitando lembrar o todo a partir de uma única imagem.",
        question: "A principal vantagem de um mapa mental é:",
        options: [
          "Forçar uma ordem estritamente linear",
          "Imitar como o cérebro associa conceitos em rede",
          "Substituir toda leitura de texto",
          "Funcionar só para temas matemáticos",
        ],
        correct: 1,
      },
      {
        id: "g7",
        title: "Aprender fazendo",
        lesson:
          "Ler sobre andar de bicicleta não ensina a andar de bicicleta. O cérebro consolida habilidades práticas muito mais rápido quando erra e ajusta em tempo real do que quando só observa a teoria.",
        question: "Por que 'aprender fazendo' costuma ser mais eficaz que só ler teoria?",
        options: [
          "Porque teoria nunca é necessária",
          "Porque o cérebro consolida habilidades errando e ajustando na prática",
          "Porque é sempre mais rápido",
          "Porque dispensa qualquer planejamento",
        ],
        correct: 1,
      },
      {
        id: "g8",
        title: "Curiosidade como motor",
        lesson:
          "Curiosidade ativa os mesmos circuitos de recompensa do cérebro que comida ou dinheiro. Perguntas abertas — 'por que isso funciona assim?' — engajam mais a memória do que informação recebida sem contexto.",
        question: "O que a curiosidade ativa no cérebro, segundo o texto?",
        options: [
          "Nenhum circuito específico",
          "Os mesmos circuitos de recompensa que comida ou dinheiro",
          "Apenas a área da visão",
          "Circuitos ligados exclusivamente ao medo",
        ],
        correct: 1,
      },
      {
        id: "g9",
        title: "Efeito de teste",
        lesson:
          "Tentar lembrar uma informação de cabeça, antes de checar a resposta, fortalece a memória mais do que reler o material passivamente. Errar durante esse teste ainda ajuda, porque o esforço de recuperação é o que consolida.",
        question: "O que fortalece mais a memória, segundo o efeito de teste?",
        options: ["Reler o texto várias vezes", "Tentar lembrar de cabeça antes de checar", "Copiar o texto palavra por palavra", "Apenas ouvir uma explicação"],
        correct: 1,
      },
      {
        id: "g10",
        title: "Intercalação de temas (interleaving)",
        lesson:
          "Estudar temas diferentes intercalados numa mesma sessão, em vez de um de cada vez até dominar, parece mais difícil no início mas gera retenção maior depois. O cérebro é forçado a discriminar entre estratégias, não só repetir uma.",
        question: "O que caracteriza a técnica de interleaving?",
        options: ["Estudar um único tema até dominar totalmente", "Intercalar temas diferentes numa mesma sessão", "Nunca revisar o que já foi visto", "Estudar sempre na mesma ordem fixa"],
        correct: 1,
      },
      {
        id: "g11",
        title: "Aprendizagem multissensorial",
        lesson:
          "Combinar texto, imagem e som sobre o mesmo conteúdo cria mais 'ganchos' de memória do que um único canal sensorial isolado. Por isso desenhar um diagrama simples enquanto se lê costuma ajudar a fixar melhor.",
        question: "Por que combinar canais sensoriais ajuda no aprendizado?",
        options: ["Porque cria mais ganchos de memória", "Porque distrai do conteúdo principal", "Porque substitui a necessidade de atenção", "Porque é sempre mais rápido"],
        correct: 0,
      },
      {
        id: "g12",
        title: "Ensinar para aprender",
        lesson:
          "Explicar um conteúdo para outra pessoa expõe rapidamente as partes que você só achava que entendia. Esse 'efeito protégé' obriga a organizar o conhecimento de forma clara, o que aprofunda a própria compreensão.",
        question: "O que o efeito protégé revela, segundo o texto?",
        options: ["Que ensinar é perda de tempo", "As partes do conteúdo que só pareciam compreendidas", "Que só professores aprendem de verdade", "Que não é preciso organizar o conhecimento"],
        correct: 1,
      },
      {
        id: "g13",
        title: "Sono e consolidação da memória",
        lesson:
          "Durante o sono profundo, o cérebro reproduz e fortalece conexões formadas durante o dia, transferindo informação para a memória de longo prazo. Dormir mal na noite após estudar reduz bastante a retenção do que foi aprendido.",
        question: "O que acontece com a memória durante o sono profundo?",
        options: ["Ela é apagada", "É consolidada e transferida para o longo prazo", "Fica igual, sem nenhuma mudança", "Só é afetada em crianças"],
        correct: 1,
      },
      {
        id: "g14",
        title: "Motivação intrínseca vs extrínseca",
        lesson:
          "Aprender por curiosidade genuína (intrínseca) sustenta esforço por mais tempo do que aprender só por nota ou prêmio (extrínseca). Recompensas externas demais podem até reduzir o interesse natural por um tema com o tempo.",
        question: "Qual motivação tende a sustentar o esforço por mais tempo?",
        options: ["Apenas recompensas externas", "Curiosidade genuína pelo tema", "Nenhuma motivação é necessária", "Pressão de terceiros"],
        correct: 1,
      },
      {
        id: "g15",
        title: "Como fazer boas perguntas",
        lesson:
          "Perguntas que pedem explicação ('por quê' e 'como') geram mais compreensão do que perguntas que só pedem fatos ('o quê' e 'quando'). Formular a própria pergunta antes de buscar a resposta já ativa parte do aprendizado.",
        question: "Que tipo de pergunta gera mais compreensão, segundo o texto?",
        options: ["Perguntas de fato, tipo 'o quê'", "Perguntas de explicação, tipo 'por quê'", "Nenhum tipo de pergunta ajuda", "Perguntas de sim ou não"],
        correct: 1,
      },
      {
        id: "g16",
        title: "Analogias como ferramenta de entendimento",
        lesson:
          "Ligar um conceito novo a algo já conhecido — 'a corrente elétrica é como água num cano' — reduz o esforço de entender do zero. Boas analogias funcionam como ponte entre o que já está na memória e a informação nova.",
        question: "Qual é a função de uma boa analogia, segundo o texto?",
        options: ["Substituir a necessidade de entender o conceito", "Servir de ponte entre o conhecido e o novo", "Tornar o assunto mais complicado", "Funcionar apenas em matemática"],
        correct: 1,
      },
      {
        id: "g17",
        title: "Gerenciamento da carga cognitiva",
        lesson:
          "A memória de trabalho consegue segurar poucos itens novos por vez. Dividir um conteúdo complexo em partes menores, dominando uma antes de somar a próxima, evita a sobrecarga que trava o entendimento.",
        question: "O que ajuda a evitar sobrecarga cognitiva, segundo o texto?",
        options: ["Apresentar tudo de uma vez", "Dividir o conteúdo em partes menores", "Ignorar a memória de trabalho", "Aumentar a velocidade da explicação"],
        correct: 1,
      },
      {
        id: "g18",
        title: "Prática deliberada",
        lesson:
          "Praticar no piloto automático, sem atenção ao que está sendo feito, gera pouco progresso mesmo com muitas repetições. Prática deliberada foca exatamente no ponto fraco, com atenção total, e é isso que gera melhora real.",
        question: "O que diferencia a prática deliberada da prática comum?",
        options: ["A quantidade de horas apenas", "O foco atento no ponto fraco específico", "Fazer no piloto automático", "Praticar sem nenhum objetivo"],
        correct: 1,
      },
      {
        id: "g19",
        title: "Erros como parte do processo",
        lesson:
          "Um erro cometido durante o estudo ativo, e corrigido logo em seguida, gera uma marca de memória mais forte do que acertar de primeira sem esforço algum. O desconforto do erro é parte do que fixa o aprendizado.",
        question: "Por que errar durante o estudo pode ajudar, segundo o texto?",
        options: ["Porque não tem nenhum efeito", "Porque gera uma marca de memória mais forte ao ser corrigido", "Porque prova falta de capacidade", "Porque deve ser sempre evitado"],
        correct: 1,
      },
      {
        id: "g20",
        title: "Ambiente de estudo ideal",
        lesson:
          "Um ambiente com poucas distrações visuais e sonoras reduz a troca constante de atenção, que é o que mais atrapalha a concentração profunda. Variar o local de estudo também pode ajudar a memória a associar o conteúdo a mais de um contexto.",
        question: "O que mais atrapalha a concentração profunda, segundo o texto?",
        options: ["A troca constante de atenção", "Estudar sempre no mesmo lugar", "Silêncio absoluto", "Ter poucos materiais"],
        correct: 0,
      },
      {
        id: "g21",
        title: "Metacognição: aprender a aprender",
        lesson:
          "Metacognição é parar e avaliar: 'eu realmente entendi isso ou só reconheço quando vejo?'. Essa checagem honesta evita a falsa sensação de domínio que vem só de reler o material várias vezes.",
        question: "O que a metacognição ajuda a evitar, segundo o texto?",
        options: ["A falsa sensação de domínio ao reler", "O uso de qualquer técnica de estudo", "A necessidade de revisar conteúdo", "O uso da memória de longo prazo"],
        correct: 0,
      },
      {
        id: "g22",
        title: "Generalização de conceitos",
        lesson:
          "Aprender um princípio em um contexto só (por exemplo, só em matemática) nem sempre transfere para outro contexto sozinho. Praticar o mesmo princípio em situações variadas é o que ajuda o cérebro a generalizar de verdade.",
        question: "O que ajuda o cérebro a generalizar um princípio aprendido?",
        options: ["Vê-lo em um único contexto", "Praticá-lo em situações variadas", "Memorizar sem praticar", "Ignorar o contexto original"],
        correct: 1,
      },
      {
        id: "g23",
        title: "Como tomar boas notas",
        lesson:
          "Reescrever a ideia com as próprias palavras, em vez de copiar frases inteiras, obriga o cérebro a processar o conteúdo enquanto anota. Notas em forma de pergunta e resposta ajudam bastante na hora de revisar depois.",
        question: "Qual forma de anotação processa mais o conteúdo, segundo o texto?",
        options: ["Copiar frases inteiras do material", "Reescrever a ideia com as próprias palavras", "Não anotar nada", "Grifar tudo em amarelo"],
        correct: 1,
      },
      {
        id: "g24",
        title: "A curva do esquecimento",
        lesson:
          "Sem nenhuma revisão, boa parte de uma informação nova é esquecida já nas primeiras 24 horas. Uma revisão rápida logo no dia seguinte 'achata' essa curva e torna o esquecimento seguinte muito mais lento.",
        question: "O que uma revisão rápida no dia seguinte faz com a curva do esquecimento?",
        options: ["Não tem nenhum efeito", "Achata a curva e desacelera o esquecimento seguinte", "Acelera o esquecimento", "Só funciona depois de um mês"],
        correct: 1,
      },
      {
        id: "g25",
        title: "Aprendizagem colaborativa",
        lesson:
          "Discutir um tema com outras pessoas expõe ângulos que passariam despercebidos sozinho, e defender uma ideia em voz alta organiza o pensamento. Grupos de estudo funcionam melhor quando cada pessoa chega com alguma preparação prévia.",
        question: "Por que discutir um tema em grupo pode ajudar no aprendizado?",
        options: ["Porque expõe ângulos que passariam despercebidos", "Porque elimina a necessidade de estudar sozinho antes", "Porque é sempre mais rápido que estudar sozinho", "Porque substitui a leitura do material"],
        correct: 0,
      },
      {
        id: "g26",
        title: "Storytelling para reter informação",
        lesson:
          "Informação organizada em forma de história, com causa e consequência, é lembrada muito melhor do que uma lista solta de fatos. O cérebro evoluiu processando narrativas, não tabelas de dados isoladas.",
        question: "Por que histórias ajudam a reter informação, segundo o texto?",
        options: ["Porque o cérebro processa narrativas naturalmente", "Porque são sempre mais curtas", "Porque eliminam a necessidade de revisão", "Porque não têm nenhuma estrutura"],
        correct: 0,
      },
      {
        id: "g27",
        title: "Definindo metas de estudo",
        lesson:
          "Uma meta de estudo como 'entender os três motivos da Primeira Guerra' é mais eficaz do que 'estudar história por uma hora', porque dá um critério claro de quando parar e o que checar depois.",
        question: "Por que uma meta de estudo específica funciona melhor que uma meta de tempo?",
        options: ["Porque dá um critério claro do que foi aprendido", "Porque garante nota alta automaticamente", "Porque exige menos esforço", "Porque elimina a necessidade de revisão"],
        correct: 0,
      },
      {
        id: "g28",
        title: "Uso de exemplos concretos",
        lesson:
          "Um conceito abstrato ('correlação não implica causalidade') fica muito mais claro com um exemplo concreto ao lado (vendas de sorvete e afogamentos sobem juntas no verão, sem uma causar a outra). Exemplos ancoram a teoria na experiência.",
        question: "O que um exemplo concreto faz por um conceito abstrato, segundo o texto?",
        options: ["Torna a teoria mais confusa", "Ancora a teoria na experiência prática", "Substitui a necessidade da teoria", "Não faz diferença nenhuma"],
        correct: 1,
      },
      {
        id: "g29",
        title: "Revisão ativa vs passiva",
        lesson:
          "Reler um texto grifado (revisão passiva) dá uma falsa sensação de familiaridade. Fechar o material e tentar recontar o conteúdo de cabeça (revisão ativa) revela de verdade o que já foi fixado.",
        question: "Qual tipo de revisão revela melhor o que já foi aprendido?",
        options: ["Revisão passiva, relendo o texto grifado", "Revisão ativa, recontando de cabeça", "Nenhuma revisão é necessária", "Apenas ouvir o mesmo áudio de novo"],
        correct: 1,
      },
      {
        id: "g30",
        title: "Constância no estudo",
        lesson:
          "Sessões curtas e frequentes de estudo, distribuídas ao longo da semana, rendem mais retenção do que uma única maratona na véspera. O cérebro consolida melhor quando tem tempo entre uma exposição e outra ao mesmo conteúdo.",
        question: "O que costuma render mais retenção, segundo o texto?",
        options: ["Uma única maratona de estudo na véspera", "Sessões curtas e frequentes ao longo da semana", "Estudar sem nenhuma pausa", "Estudar apenas uma vez por mês"],
        correct: 1,
      },
    ],
  },
];

TRACKS.push({
  id: "escatologia",
  name: "Últimos Tempos",
  tagline: "teologia e escatologia bíblica",
  icon: Sparkles,
  color: "#4A3A78",
  topics: [
    {
      id: "e1",
      title: "O que é escatologia bíblica",
      lesson:
        "Escatologia é o estudo do que a Bíblia ensina sobre os eventos finais da história: a volta de Cristo, a ressurreição, o juízo e a nova criação. Não é sobre prever datas, mas entender o rumo para onde a história caminha segundo as Escrituras.",
      question: "O foco principal da escatologia bíblica é:",
      options: [
        "Calcular a data exata do fim do mundo",
        "Entender o rumo da história segundo as Escrituras",
        "Estudar apenas o livro de Apocalipse",
        "Um assunto sem relevância prática",
      ],
      correct: 1,
    },
    {
      id: "e2",
      title: "As três correntes sobre o milênio",
      lesson:
        "Historicamente, cristãos leem Apocalipse 20 de três formas: pré-milenismo (Cristo volta antes de um reinado de mil anos), amilenismo (o milênio é simbólico, já em curso desde a igreja) e pós-milenismo (o mundo melhora gradualmente até a volta de Cristo). Cada corrente tem defensores sérios ao longo da história da igreja.",
      question: "Quantas correntes principais existem sobre a interpretação do milênio de Apocalipse 20?",
      options: ["Duas", "Três", "Cinco", "Nenhuma, é consenso"],
      correct: 1,
    },
    {
      id: "e3",
      title: "Milenismo histórico vs. dispensacionalista",
      lesson:
        "Dentro do pré-milenismo há duas versões: a dispensacionalista, que separa Israel e a Igreja e prevê um arrebatamento antes da tribulação; e o milenismo histórico, mais antigo, que entende a Igreja passando pela tribulação e sendo arrebatada na volta visível de Cristo, logo antes do milênio.",
      question: "O que diferencia o milenismo histórico do dispensacionalista?",
      options: [
        "O histórico nega a volta física de Cristo",
        "O histórico entende que a Igreja passa pela tribulação",
        "O dispensacionalista não acredita no milênio",
        "Não há nenhuma diferença real entre eles",
      ],
      correct: 1,
    },
    {
      id: "e4",
      title: "A grande tribulação",
      lesson:
        "A tribulação é descrita em passagens como Mateus 24 e Apocalipse 6-18 como um período de intensa perseguição e juízo antes da volta de Cristo. Na leitura pós-tribulacionista, a igreja não é retirada do mundo antes desse período, mas é preservada por Deus através dele, como aconteceu com os cristãos ao longo da história em perseguições.",
      question: "Na perspectiva pós-tribulacionista, o que acontece com a igreja durante a tribulação?",
      options: [
        "Ela é retirada da terra antes de começar",
        "Ela passa pelo período, sendo preservada por Deus",
        "Ela deixa de existir",
        "Ela não é mencionada nesse período",
      ],
      correct: 1,
    },
    {
      id: "e5",
      title: "Pós-tribulacionismo e o arrebatamento",
      lesson:
        "Pós-tribulacionistas leem 1 Tessalonicenses 4 e Mateus 24 como um único evento: o arrebatamento da igreja acontece no mesmo momento da volta visível e gloriosa de Cristo, ao final da tribulação — não em um retorno separado e anterior. Arrebatamento e segunda vinda são, nessa leitura, a mesma cena vista de ângulos diferentes.",
      question: "Para o pós-tribulacionismo, o arrebatamento e a segunda vinda de Cristo são:",
      options: [
        "Dois eventos separados por sete anos",
        "O mesmo evento, ao final da tribulação",
        "Eventos sem nenhuma relação entre si",
        "Algo que já aconteceu no passado",
      ],
      correct: 1,
    },
    {
      id: "e6",
      title: "Sinais da volta de Cristo",
      lesson:
        "Mateus 24 lista sinais como guerras, fome, falsos profetas e o evangelho pregado a todas as nações — mas o próprio texto adverte que ninguém sabe o dia ou a hora. Os sinais servem para vigilância e esperança, não para cálculos de calendário.",
      question: "Qual é a função dos sinais mencionados em Mateus 24, segundo o texto?",
      options: [
        "Permitir calcular a data exata do retorno",
        "Servir para vigilância e esperança, não para cálculos",
        "Provar que o retorno já aconteceu",
        "Substituir a necessidade de fé",
      ],
      correct: 1,
    },
    {
      id: "e7",
      title: "O anticristo e a besta",
      lesson:
        "2 Tessalonicenses 2 fala do 'homem da iniquidade' e Apocalipse 13 descreve uma besta que exige adoração e controla o comércio. Ao longo da história, muitas figuras poderosas já foram apontadas como candidatos — um lembrete de como esse tema é usado com cautela pela igreja, evitando identificações precipitadas.",
      question: "O texto recomenda que identificações específicas do anticristo com pessoas atuais sejam feitas:",
      options: [
        "Com total certeza e urgência",
        "Com cautela, evitando identificações precipitadas",
        "Ignorando completamente o tema",
        "Apenas por líderes religiosos famosos",
      ],
      correct: 1,
    },
    {
      id: "e8",
      title: "O milênio e o juízo final",
      lesson:
        "Após a volta de Cristo, o milenismo histórico entende um reinado terreno de Cristo com os santos, seguido pelo juízo final diante do grande trono branco (Apocalipse 20) e a chegada dos novos céus e nova terra (Apocalipse 21). O fim da história bíblica não é destruição, mas restauração.",
      question: "Segundo o texto, como termina a narrativa escatológica bíblica?",
      options: [
        "Com a destruição definitiva de tudo",
        "Com a restauração em novos céus e nova terra",
        "Sem nenhuma conclusão clara",
        "Com o fim apenas da igreja",
      ],
      correct: 1,
    },
    {
      id: "e9",
      title: "As 70 semanas de Daniel",
      lesson:
        "Daniel 9 descreve um período de '70 semanas' (grupos de 7 anos) decretado para o povo de Israel, apontando para a vinda do Messias e eventos futuros. É uma das passagens mais estudadas e debatidas da profecia bíblica, com leituras diferentes entre tradições cristãs.",
      question: "O que Daniel 9 descreve, segundo o texto?",
      options: ["Um período de 70 semanas ligado à vinda do Messias", "Uma lista de reis babilônios", "Uma genealogia completa de Israel", "Um calendário agrícola"],
      correct: 0,
    },
    {
      id: "e10",
      title: "Como ler o livro de Apocalipse",
      lesson:
        "Apocalipse é um livro de gênero apocalíptico, cheio de símbolos que remetem ao Antigo Testamento (números, cores, animais). Lê-lo bem exige entender essa linguagem simbólica, não apenas tomar cada imagem como literal ao pé da letra.",
      question: "O que é essencial para interpretar bem o livro de Apocalipse?",
      options: ["Ignorar toda a linguagem simbólica", "Entender o gênero apocalíptico e seus símbolos", "Ler apenas o último capítulo", "Desconsiderar o Antigo Testamento"],
      correct: 1,
    },
    {
      id: "e11",
      title: "As sete igrejas de Apocalipse",
      lesson:
        "Os capítulos 2 e 3 de Apocalipse trazem cartas a sete igrejas reais da Ásia Menor, cada uma recebendo elogio, correção ou ambos. Elas funcionam como um espelho atemporal para o estado espiritual de qualquer igreja hoje.",
      question: "Qual é a função das cartas às sete igrejas, segundo o texto?",
      options: ["Servir apenas de registro histórico sem aplicação", "Funcionar como espelho espiritual atemporal", "Prever nomes de líderes futuros", "Substituir os evangelhos"],
      correct: 1,
    },
    {
      id: "e12",
      title: "Selos, trombetas e taças",
      lesson:
        "Apocalipse 6 a 16 descreve três séries de julgamentos — selos, trombetas e taças — que aumentam em intensidade. Estudiosos debatem se elas são sequenciais, paralelas ou parcialmente sobrepostas, mas todas apontam para o mesmo clímax: a volta de Cristo.",
      question: "Para onde as três séries de julgamentos apontam, segundo o texto?",
      options: ["Para o fim apenas de Israel", "Para o mesmo clímax: a volta de Cristo", "Para eventos sem nenhuma relação entre si", "Para o início da criação"],
      correct: 1,
    },
    {
      id: "e13",
      title: "A besta do mar e a besta da terra",
      lesson:
        "Apocalipse 13 descreve duas figuras: uma besta política, que exige adoração e domina nações, e uma besta religiosa (o falso profeta), que promove a adoração da primeira. Juntas representam poder e engano unidos contra a fé.",
      question: "O que a besta da terra (falso profeta) faz, segundo o texto?",
      options: ["Combate a besta do mar", "Promove a adoração da besta do mar", "Não tem nenhuma função no texto", "Representa a igreja fiel"],
      correct: 1,
    },
    {
      id: "e14",
      title: "Babilônia, a grande",
      lesson:
        "Em Apocalipse 17-18, 'Babilônia' representa um sistema global de idolatria, luxo e opressão que será derrubado. O nome remete à antiga Babilônia do Antigo Testamento, símbolo histórico de orgulho humano contra Deus.",
      question: "O que 'Babilônia' representa em Apocalipse 17-18, segundo o texto?",
      options: ["Uma cidade que ainda será construída do zero", "Um sistema global de idolatria e opressão", "Apenas a nação de Israel", "Uma igreja específica"],
      correct: 1,
    },
    {
      id: "e15",
      title: "Armagedom",
      lesson:
        "Armagedom é mencionado em Apocalipse 16 como o local simbólico de reunião das forças do mal antes do julgamento final de Deus. O termo virou sinônimo popular de 'batalha final', mas seu uso bíblico é mais teológico do que geográfico.",
      question: "Segundo o texto, o uso bíblico de Armagedom é:",
      options: ["Puramente geográfico e literal", "Mais teológico, ligado ao julgamento final", "Sem nenhuma relação com o mal", "Um local já destruído na história antiga"],
      correct: 1,
    },
    {
      id: "e16",
      title: "A ressurreição dos mortos",
      lesson:
        "A Bíblia ensina uma ressurreição corporal, não apenas espiritual — o mesmo corpo transformado e glorificado (1 Coríntios 15). Na visão pós-tribulacionista, essa ressurreição dos que morreram em Cristo acontece no momento da volta visível dele.",
      question: "Que tipo de ressurreição a Bíblia ensina, segundo o texto?",
      options: ["Apenas espiritual, sem corpo", "Corporal, com o corpo transformado", "Nenhuma ressurreição é ensinada", "Só para alguns poucos escolhidos"],
      correct: 1,
    },
    {
      id: "e17",
      title: "O grande trono branco",
      lesson:
        "Apocalipse 20 descreve um julgamento final diante de um grande trono branco, onde os mortos são julgados 'segundo as suas obras', registradas em livros, mas com o Livro da Vida decidindo o destino eterno de cada um.",
      question: "O que decide o destino eterno de cada pessoa no julgamento final, segundo o texto?",
      options: ["Apenas as obras registradas", "O registro no Livro da Vida", "A opinião de outras pessoas", "Nenhum critério é mencionado"],
      correct: 1,
    },
    {
      id: "e18",
      title: "Novos céus e nova terra",
      lesson:
        "Apocalipse 21 descreve não a destruição final do mundo material, mas sua renovação — uma nova criação onde Deus habita com as pessoas, sem mais choro, morte ou dor. É o desfecho de esperança de toda a narrativa bíblica.",
      question: "Como o texto descreve os novos céus e nova terra?",
      options: ["Como a destruição total da matéria", "Como uma renovação da criação, sem dor ou morte", "Como um lugar apenas espiritual, sem nenhuma forma", "Como um evento já superado"],
      correct: 1,
    },
    {
      id: "e19",
      title: "O reinado milenar (visão histórica)",
      lesson:
        "No milenismo histórico, o reinado de mil anos de Cristo com os santos (Apocalipse 20) acontece após a volta visível dele, ao final da tribulação — diferente do dispensacionalismo, que insere um intervalo maior entre um suposto arrebatamento anterior e esse reinado.",
      question: "Quando o milênio ocorre na leitura do milenismo histórico?",
      options: ["Antes de qualquer volta de Cristo", "Após a volta visível de Cristo, ao final da tribulação", "Durante a vida da igreja primitiva", "Não é mencionado nessa tradição"],
      correct: 1,
    },
    {
      id: "e20",
      title: "Israel e a igreja na escatologia",
      lesson:
        "Tradições diferem sobre a relação entre Israel e a igreja nos últimos tempos: algumas mantêm papéis separados para cada um, outras entendem a igreja como continuação do povo de Deus, cumprindo promessas feitas a Israel em Cristo. É um dos temas mais debatidos da escatologia cristã.",
      question: "Segundo o texto, a relação entre Israel e a igreja na escatologia é:",
      options: ["Um consenso total entre todos os cristãos", "Um dos temas mais debatidos entre as tradições", "Um assunto sem nenhuma relevância teológica", "Resolvido apenas no Antigo Testamento"],
      correct: 1,
    },
    {
      id: "e21",
      title: "O anjo Miguel e a batalha espiritual",
      lesson:
        "Apocalipse 12 descreve o arcanjo Miguel batalhando contra o dragão (Satanás) nos céus. A passagem mostra que os eventos finais têm uma dimensão espiritual por trás dos acontecimentos visíveis na terra.",
      question: "O que Apocalipse 12 revela sobre os últimos tempos, segundo o texto?",
      options: ["Que não há nenhuma dimensão espiritual envolvida", "Que há uma batalha espiritual por trás dos eventos visíveis", "Que Miguel é o mesmo que o anticristo", "Que o capítulo trata só de política humana"],
      correct: 1,
    },
    {
      id: "e22",
      title: "A parábola das dez virgens",
      lesson:
        "Em Mateus 25, dez jovens esperam um noivo; cinco se preparam com óleo extra, cinco não. A parábola ensina vigilância constante para a volta de Cristo, já que ninguém sabe a hora exata — preparo contínuo, não pânico de última hora.",
      question: "Qual é a lição principal da parábola das dez virgens, segundo o texto?",
      options: ["Vigilância e preparo contínuo", "Que a volta de Cristo já tem data marcada", "Que só metade das pessoas será salva", "Que óleo é o tema central da parábola"],
      correct: 0,
    },
    {
      id: "e23",
      title: "O Dia do Senhor no Antigo Testamento",
      lesson:
        "Profetas como Joel e Amós já falavam de um 'Dia do Senhor' — momento de juízo divino sobre a injustiça e de restauração para os fiéis. O Novo Testamento retoma essa expressão para descrever a volta de Cristo e o juízo final.",
      question: "O que o 'Dia do Senhor' representa no Antigo Testamento, segundo o texto?",
      options: ["Um feriado religioso comum", "Um momento de juízo divino e restauração", "Um evento sem conexão com o Novo Testamento", "Apenas uma expressão poética sem significado"],
      correct: 1,
    },
    {
      id: "e24",
      title: "Profecias messiânicas cumpridas",
      lesson:
        "Textos como Isaías 53 e Salmos 22, escritos séculos antes de Cristo, descrevem com detalhe o sofrimento do Messias — algo que cristãos veem cumprido na crucificação de Jesus. Essas profecias cumpridas são um argumento clássico de confiança na Escritura.",
      question: "O que profecias como Isaías 53 descrevem, segundo o texto?",
      options: ["A vitória militar do Messias", "O sofrimento do Messias, cumprido em Cristo", "A construção do templo", "A vida de Davi apenas"],
      correct: 1,
    },
    {
      id: "e25",
      title: "O papel do Espírito Santo nos últimos dias",
      lesson:
        "Atos 2 cita a profecia de Joel sobre o Espírito sendo derramado 'sobre toda carne' nos últimos dias — período que, na teologia cristã, começou no Pentecostes e continua até a volta de Cristo. A igreja vive, portanto, já nesses 'últimos dias'.",
      question: "Segundo essa leitura, quando começaram os 'últimos dias' mencionados em Atos 2?",
      options: ["Só vão começar no futuro distante", "No Pentecostes, com o derramar do Espírito", "Apenas quando Cristo voltar", "Não têm relação com o Espírito Santo"],
      correct: 1,
    },
    {
      id: "e26",
      title: "A grande apostasia",
      lesson:
        "2 Tessalonicenses 2 menciona um afastamento em massa da fé ('a apostasia') como sinal que precede a manifestação plena do anticristo. É um alerta para vigilância espiritual, não motivo de pânico ou especulação excessiva.",
      question: "O que 2 Tessalonicenses 2 associa ao surgimento do anticristo, segundo o texto?",
      options: ["Um período de grande apostasia (afastamento da fé)", "Um período de avivamento generalizado", "Nenhum sinal é mencionado", "Apenas eventos políticos externos"],
      correct: 0,
    },
    {
      id: "e27",
      title: "Perseverança dos santos na tribulação",
      lesson:
        "Apocalipse descreve os santos vencendo 'pelo sangue do Cordeiro e pela palavra do testemunho', mantendo fidelidade mesmo sob perseguição intensa. A ênfase pós-tribulacionista está em perseverar fortalecido por Deus, não em escapar do sofrimento.",
      question: "Qual é a ênfase pós-tribulacionista sobre a fé durante a tribulação, segundo o texto?",
      options: ["Escapar do sofrimento a qualquer custo", "Perseverar fortalecido por Deus mesmo na dificuldade", "Que a fé desaparece nesse período", "Que ninguém resiste até o fim"],
      correct: 1,
    },
    {
      id: "e28",
      title: "Sinais nos céus e na natureza",
      lesson:
        "Passagens como Lucas 21 mencionam sinais no sol, na lua e nas estrelas ligados à volta de Cristo. Tradicionalmente lidos com cautela — como parte de uma linguagem profética mais ampla — e não como previsões meteorológicas literais e imediatas.",
      question: "Como o texto recomenda ler os sinais nos céus mencionados em Lucas 21?",
      options: ["Como previsões meteorológicas exatas e imediatas", "Com cautela, como parte de linguagem profética mais ampla", "Como algo já totalmente irrelevante", "Como o único sinal a se observar"],
      correct: 1,
    },
    {
      id: "e29",
      title: "A esperança escatológica no cotidiano",
      lesson:
        "A esperança na volta de Cristo, na teologia cristã, não é fuga do presente, mas motivação para viver com integridade agora — 'aquele que tem esta esperança nele se purifica' (1 João 3:3). Escatologia bem entendida molda o caráter hoje, não só a curiosidade sobre o futuro.",
      question: "Qual efeito a esperança escatológica deveria ter no presente, segundo o texto?",
      options: ["Nenhum, é só curiosidade sobre o futuro", "Motivar a viver com integridade agora", "Justificar a inação e o medo", "Servir apenas para debates teóricos"],
      correct: 1,
    },
    {
      id: "e30",
      title: "Como viver à luz da volta de Cristo",
      lesson:
        "A resposta bíblica mais repetida sobre os últimos tempos não é cálculo de datas, mas vigilância prática: fidelidade no pequeno, amor ao próximo e testemunho constante, 'como se Cristo pudesse voltar hoje'. Esse é o resumo prático de toda a trilha.",
      question: "Qual é a resposta prática mais enfatizada diante da escatologia, segundo o texto?",
      options: ["Calcular datas exatas do retorno", "Vigilância prática: fidelidade, amor e testemunho", "Preocupação constante e ansiedade", "Ignorar o tema completamente"],
      correct: 1,
    },
  ],
});

const XP_PER_TOPIC = 20;
const XP_PER_LEVEL = 200;
const STORAGE_KEY = "trilha-progress-v1";

const CHALLENGE_DAYS = 30;
const todayStr = () => new Date().toISOString().slice(0, 10);

function defaultProgress() {
  return {
    xp: 0,
    streak: 0,
    lastActiveDate: null,
    challengeStart: null,
    completed: { pessoal: [], geral: [], escatologia: [] },
  };
}

function getDayIndex(progress) {
  if (!progress.challengeStart) return 0;
  const start = new Date(progress.challengeStart + "T00:00:00");
  const now = new Date(todayStr() + "T00:00:00");
  const diffDays = Math.round((now - start) / (1000 * 60 * 60 * 24));
  return Math.max(0, Math.min(CHALLENGE_DAYS - 1, diffDays));
}

function applyStreak(progress) {
  const today = todayStr();
  if (progress.lastActiveDate === today) return progress;
  const y = new Date();
  y.setDate(y.getDate() - 1);
  const yesterday = y.toISOString().slice(0, 10);
  const streak =
    progress.lastActiveDate === yesterday ? progress.streak + 1 : 1;
  return { ...progress, streak, lastActiveDate: today };
}

export default function TrilhaApp() {
  useFonts();
  const [progress, setProgress] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState("home");
  const [trackId, setTrackId] = useState(null);
  const [topicId, setTopicId] = useState(null);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    (async () => {
      let p = defaultProgress();
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) p = JSON.parse(raw);
      } catch (e) {
        // no existing progress yet
      }
      p = applyStreak(p);
      if (!p.challengeStart) p.challengeStart = todayStr();
      setProgress(p);
      setLoaded(true);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
      } catch (e) {
        console.error("Falha ao salvar progresso", e);
      }
    })();
  }, []);

  const persist = useCallback(async (next) => {
    setProgress(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.error("Falha ao salvar progresso", e);
    }
  }, []);

  if (!loaded || !progress) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F3ECD9",
          fontFamily: "'Public Sans', sans-serif",
          color: "#3A3226",
        }}
      >
        Carregando sua trilha…
      </div>
    );
  }

  const level = Math.floor(progress.xp / XP_PER_LEVEL) + 1;
  const xpIntoLevel = progress.xp % XP_PER_LEVEL;
  const dayIndex = getDayIndex(progress);

  const openTopic = (tId, topId) => {
    setTrackId(tId);
    setTopicId(topId);
    setAnswerIdx(null);
    setShowResult(false);
    setView("topic");
  };

  const submitAnswer = () => {
    setShowResult(true);
  };

  const finishTopic = async () => {
    const track = TRACKS.find((t) => t.id === trackId);
    const topic = track.topics.find((t) => t.id === topicId);
    const alreadyDone = progress.completed[trackId].includes(topicId);
    const next = {
      ...progress,
      xp: alreadyDone ? progress.xp : progress.xp + XP_PER_TOPIC,
      completed: alreadyDone
        ? progress.completed
        : {
            ...progress.completed,
            [trackId]: [...progress.completed[trackId], topicId],
          },
    };
    await persist(next);
    setView("home");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F3ECD9",
        fontFamily: "'Public Sans', sans-serif",
        color: "#2A2420",
      }}
    >
      <style>{`
        .display { font-family: 'Fraunces', serif; }
        .btn { transition: transform .15s ease, box-shadow .15s ease; }
        .btn:active { transform: scale(0.97); }
        .node-line { background: repeating-linear-gradient(to bottom, #B8863B 0 6px, transparent 6px 14px); }
        *:focus-visible { outline: 2px solid #B8863B; outline-offset: 2px; }
      `}</style>

      {view === "home" && (
        <HomeView
          progress={progress}
          level={level}
          xpIntoLevel={xpIntoLevel}
          dayIndex={dayIndex}
          onOpenTopic={openTopic}
        />
      )}

      {view === "topic" && (
        <TopicView
          track={TRACKS.find((t) => t.id === trackId)}
          topic={TRACKS.find((t) => t.id === trackId).topics.find(
            (t) => t.id === topicId
          )}
          answerIdx={answerIdx}
          setAnswerIdx={setAnswerIdx}
          showResult={showResult}
          onSubmit={submitAnswer}
          onFinish={finishTopic}
          onBack={() => setView("home")}
        />
      )}
    </div>
  );
}

function HomeView({ progress, level, xpIntoLevel, dayIndex, onOpenTopic }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", paddingBottom: 48 }}>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 20px 12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#1B2A4A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Compass size={22} color="#F3ECD9" />
          </div>
          <div>
            <div className="display" style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.1 }}>
              Trilha
            </div>
            <div style={{ fontSize: 12, color: "#7A6F5D" }}>sua jornada diária</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Pill icon={<Flame size={14} color="#7A2E2E" />} value={progress.streak} />
          <Pill icon={<Star size={14} color="#B8863B" />} value={progress.xp} />
        </div>
      </div>

      <div style={{ margin: "0 20px 4px", fontSize: 12, fontWeight: 700, color: "#7A6F5D", letterSpacing: 0.5 }}>
        DESAFIO DE 30 DIAS · DIA {dayIndex + 1} DE {CHALLENGE_DAYS}
      </div>

      {/* Hero */}
      <div
        style={{
          margin: "8px 20px 20px",
          borderRadius: 20,
          padding: "28px 24px",
          background:
            "linear-gradient(155deg, #1B2A4A 0%, #24304a 55%, #2F5233 130%)",
          color: "#F3ECD9",
        }}
      >
        <div style={{ fontSize: 14, opacity: 0.75 }}>{greeting},</div>
        <div className="display" style={{ fontSize: 30, fontWeight: 700, margin: "2px 0 12px" }}>
          Explorador(a)
        </div>
        <div
          style={{
            borderLeft: "3px solid #B8863B",
            paddingLeft: 12,
            fontStyle: "italic",
            fontSize: 15,
            lineHeight: 1.5,
            opacity: 0.9,
          }}
        >
          Cada trecho da trilha vale a mesma coisa: um passo a mais do que ontem.
        </div>

        <div style={{ marginTop: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, opacity: 0.8, marginBottom: 6 }}>
            <span>Nível {level}</span>
            <span>{xpIntoLevel} / {XP_PER_LEVEL} XP</span>
          </div>
          <div style={{ height: 8, borderRadius: 6, background: "rgba(243,236,217,0.2)" }}>
            <div
              style={{
                height: "100%",
                width: `${(xpIntoLevel / XP_PER_LEVEL) * 100}%`,
                borderRadius: 6,
                background: "#B8863B",
              }}
            />
          </div>
        </div>
      </div>

      {/* Tracks */}
      {TRACKS.map((track) => (
        <TrackSection
          key={track.id}
          track={track}
          completedIds={progress.completed[track.id]}
          dayIndex={dayIndex}
          onOpenTopic={onOpenTopic}
        />
      ))}
    </div>
  );
}

function Pill({ icon, value }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        background: "#fff",
        border: "1px solid #E4D9BC",
        borderRadius: 999,
        padding: "6px 12px",
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      {icon}
      {value}
    </div>
  );
}

function TrackSection({ track, completedIds, dayIndex, onOpenTopic }) {
  const Icon = track.icon;

  return (
    <div style={{ margin: "0 20px 28px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <Icon size={18} color={track.color} />
        <div className="display" style={{ fontSize: 19, fontWeight: 600 }}>
          {track.name}
        </div>
      </div>
      <div style={{ fontSize: 12, color: "#7A6F5D", marginBottom: 14, marginLeft: 28 }}>
        {track.tagline} · {completedIds.length}/{track.topics.length} temas
      </div>

      <div style={{ position: "relative", paddingLeft: 28 }}>
        <div
          className="node-line"
          style={{
            position: "absolute",
            left: 13,
            top: 4,
            bottom: 4,
            width: 2,
          }}
        />
        {track.topics.map((topic, idx) => {
          const done = completedIds.includes(topic.id);
          const locked = idx > dayIndex;
          const current = idx === dayIndex && !done;
          return (
            <div
              key={topic.id}
              style={{ position: "relative", marginBottom: 14 }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -28,
                  top: 2,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: done ? track.color : current ? "#fff" : "#EAE0C6",
                  border: current ? `2px solid ${track.color}` : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {done ? (
                  <Check size={14} color="#fff" />
                ) : locked ? (
                  <Lock size={12} color="#B4A98A" />
                ) : (
                  <span style={{ fontSize: 11, fontWeight: 700, color: track.color }}>
                    {idx + 1}
                  </span>
                )}
              </div>
              <button
                className="btn"
                disabled={locked}
                onClick={() => !locked && onOpenTopic(track.id, topic.id)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "#fff",
                  border: "1px solid #E4D9BC",
                  borderRadius: 12,
                  padding: "12px 14px",
                  cursor: locked ? "not-allowed" : "pointer",
                  opacity: locked ? 0.55 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 500 }}>{topic.title}</span>
                {!locked && !done && <Play size={16} color={track.color} />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TopicView({ track, topic, answerIdx, setAnswerIdx, showResult, onSubmit, onFinish, onBack }) {
  const isCorrect = answerIdx === topic.correct;
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "20px 20px 40px" }}>
      <button
        onClick={onBack}
        className="btn"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: "none",
          border: "none",
          color: "#7A6F5D",
          fontSize: 14,
          marginBottom: 16,
          cursor: "pointer",
          padding: 0,
        }}
      >
        <ChevronLeft size={18} /> Voltar
      </button>

      <div style={{ fontSize: 12, color: track.color, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>
        {track.name}
      </div>
      <div className="display" style={{ fontSize: 26, fontWeight: 700, margin: "6px 0 18px" }}>
        {topic.title}
      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid #E4D9BC",
          borderRadius: 16,
          padding: 20,
          fontSize: 15,
          lineHeight: 1.65,
          marginBottom: 20,
        }}
      >
        {topic.lesson}
      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid #E4D9BC",
          borderRadius: 16,
          padding: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <Sparkles size={16} color={track.color} />
          <div style={{ fontWeight: 600, fontSize: 14 }}>Confira o que ficou</div>
        </div>
        <div style={{ fontSize: 14, marginBottom: 14 }}>{topic.question}</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {topic.options.map((opt, idx) => {
            const chosen = answerIdx === idx;
            let bg = "#F8F4E8";
            let border = "#E4D9BC";
            if (showResult) {
              if (idx === topic.correct) {
                bg = "#E4EEE2";
                border = "#5B7553";
              } else if (chosen) {
                bg = "#F3E1DE";
                border = "#7A2E2E";
              }
            } else if (chosen) {
              border = track.color;
            }
            return (
              <button
                key={idx}
                onClick={() => !showResult && setAnswerIdx(idx)}
                className="btn"
                style={{
                  textAlign: "left",
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: `1.5px solid ${border}`,
                  background: bg,
                  cursor: showResult ? "default" : "pointer",
                  fontSize: 14,
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {!showResult ? (
          <button
            onClick={onSubmit}
            disabled={answerIdx === null}
            className="btn"
            style={{
              marginTop: 16,
              width: "100%",
              padding: "12px",
              borderRadius: 10,
              border: "none",
              background: answerIdx === null ? "#DCD2B4" : "#1B2A4A",
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              cursor: answerIdx === null ? "not-allowed" : "pointer",
            }}
          >
            Confirmar resposta
          </button>
        ) : (
          <div style={{ marginTop: 16 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: isCorrect ? "#3E6636" : "#7A2E2E",
                marginBottom: 10,
              }}
            >
              {isCorrect ? "Boa! Resposta certa." : "Quase — vale revisar o texto acima."}
            </div>
            <button
              onClick={onFinish}
              className="btn"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 10,
                border: "none",
                background: "#B8863B",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Concluir tema (+{XP_PER_TOPIC} XP)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
