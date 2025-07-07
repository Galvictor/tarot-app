import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { tarotDeck } from "../data/tarotDeck";
import type { TarotCard } from "../data/tarotDeck";
import { motion } from "framer-motion";

const NewReading: React.FC = () => {
    const [reason, setReason] = useState("");
    const [readingType, setReadingType] = useState<number>(3);
    const [viewStep, setViewStep] = useState<
        "pre-shuffle" | "shuffling" | "selecting"
    >("pre-shuffle");
    const [deck, setDeck] = useState<TarotCard[]>([]);
    const [flipped, setFlipped] = useState<boolean[]>([]);
    const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
    const [shufflingDeck, setShufflingDeck] = useState<TarotCard[]>(tarotDeck);

    function shuffle(array: TarotCard[]): TarotCard[] {
        const copy = [...array];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    const handleShuffle = () => {
        setViewStep("shuffling");

        // vira todas para baixo primeiro
        setTimeout(() => {
            const shuffled = shuffle(tarotDeck);
            setDeck(shuffled);
            setFlipped(new Array(shuffled.length).fill(false));
            setSelectedCards([]);
            setViewStep("selecting");
        }, 1500);
    };

    const handleCardClick = (index: number) => {
        if (flipped[index]) return;
        if (selectedCards.length >= readingType) return;

        const newFlipped = [...flipped];
        newFlipped[index] = true;
        setFlipped(newFlipped);
        setSelectedCards([...selectedCards, deck[index]]);
    };

    useEffect(() => {
        if (viewStep === "shuffling") {
            const interval = setInterval(() => {
                setShufflingDeck(shuffle(tarotDeck));
            }, 300);

            setTimeout(() => {
                clearInterval(interval);
                const finalDeck = shuffle(tarotDeck);
                setDeck(finalDeck);
                setFlipped(new Array(finalDeck.length).fill(false));
                setSelectedCards([]);
                setViewStep("selecting");
            }, 1500);
        }
    }, [viewStep]);

    return (
        <div>
            <h2>Nova Tiragem</h2>
            <Form>
                <FormGroup>
                    <Label for="readingType">Escolha o tipo de tiragem:</Label>
                    <Input
                        type="select"
                        id="readingType"
                        value={readingType}
                        onChange={(e) => setReadingType(Number(e.target.value))}
                        disabled={viewStep !== "pre-shuffle"}
                    >
                        <option value={1}>1 carta</option>
                        <option value={3}>3 cartas</option>
                        <option value={10}>10 cartas (Cruz Celta)</option>
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Label for="reason">
                        Por que você está fazendo essa tiragem?
                    </Label>
                    <Input
                        type="textarea"
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Ex: Estou com dúvidas sobre meu futuro profissional..."
                        rows={3}
                        disabled={viewStep !== "pre-shuffle"}
                    />
                </FormGroup>
            </Form>

            {viewStep === "pre-shuffle" && (
                <>
                    <h5 className="mt-4">Cartas disponíveis:</h5>
                    <div className="d-flex flex-wrap justify-content-center">
                        {tarotDeck.map((card) => (
                            <div
                                key={card.id}
                                style={{
                                    width: 100,
                                    margin: 6,
                                    textAlign: "center",
                                }}
                            >
                                <img
                                    src={card.image}
                                    alt={card.name}
                                    style={{
                                        width: "100%",
                                        borderRadius: 4,
                                        boxShadow: "0 0 4px rgba(0,0,0,0.3)",
                                    }}
                                />
                                <small>{card.name}</small>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-3">
                        <button
                            className="btn btn-warning"
                            onClick={handleShuffle}
                        >
                            Embaralhar baralho
                        </button>
                    </div>
                </>
            )}

            {viewStep === "shuffling" && (
                <div className="text-center mt-4">
                    <h5>Embaralhando cartas...</h5>
                    <div className="d-flex flex-wrap justify-content-center mt-3">
                        {shuffle(tarotDeck).map((card) => (
                            <motion.div
                                key={card.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                }}
                                style={{
                                    width: 100,
                                    height: 150,
                                    margin: 6,
                                    backgroundColor: "purple",
                                    borderRadius: 6,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: "white",
                                    fontSize: 30,
                                    boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                                }}
                            >
                                🔮
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {viewStep === "selecting" && (
                <>
                    <h5 className="mt-4">Escolha {readingType} carta(s):</h5>
                    <div className="d-flex flex-wrap justify-content-center mt-2">
                        {deck.map((card, index) => (
                            <div
                                key={index}
                                style={{
                                    width: 100,
                                    height: 150,
                                    background: flipped[index]
                                        ? "white"
                                        : "purple",
                                    color: flipped[index] ? "black" : "white",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    margin: 10,
                                    borderRadius: 8,
                                    cursor: flipped[index]
                                        ? "default"
                                        : selectedCards.length < readingType
                                        ? "pointer"
                                        : "not-allowed",
                                    fontSize: 24,
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                                    transition: "transform 0.3s",
                                }}
                                onClick={() => handleCardClick(index)}
                            >
                                {flipped[index] ? (
                                    <span
                                        style={{
                                            padding: 8,
                                            textAlign: "center",
                                        }}
                                    >
                                        {card.name}
                                    </span>
                                ) : (
                                    "🔮"
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default NewReading;
