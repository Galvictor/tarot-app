import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { tarotDeck } from "../data/tarotDeck";
import type { TarotCard } from "../data/tarotDeck";

const NewReading: React.FC = () => {
    const [reason, setReason] = useState("");
    const [readingType, setReadingType] = useState<number>(3);
    const [deck, setDeck] = useState<TarotCard[]>([]);
    const [flipped, setFlipped] = useState<boolean[]>([]);

    function shuffle(array: TarotCard[]): TarotCard[] {
        const copy = [...array];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    const handleShuffle = () => {
        const shuffled = shuffle(tarotDeck);
        const selected = shuffled.slice(0, readingType);
        setDeck(selected);
        setFlipped(new Array(readingType).fill(false));
    };

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
                    />
                </FormGroup>
            </Form>

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
                <button className="btn btn-warning" onClick={handleShuffle}>
                    Embaralhar baralho
                </button>
            </div>

            {deck.length > 0 && (
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
                                    cursor: "pointer",
                                    fontSize: 24,
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                                }}
                                onClick={() => {
                                    if (!flipped[index]) {
                                        const newFlipped = [...flipped];
                                        newFlipped[index] = true;
                                        setFlipped(newFlipped);
                                    }
                                }}
                            >
                                {flipped[index] ? card.name : "🔮"}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default NewReading;
