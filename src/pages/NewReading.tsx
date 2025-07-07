import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { tarotDeck } from "../data/tarotDeck";
import type { TarotCard } from "../data/tarotDeck";

const NewReading: React.FC = () => {
    const [reason, setReason] = useState("");
    const [readingType, setReadingType] = useState<number>(3);
    const [deck] = useState<TarotCard[]>(() => shuffle(tarotDeck).slice(0, 10));

    function shuffle(array: TarotCard[]): TarotCard[] {
        const copy = [...array];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

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

            <div className="d-flex flex-wrap justify-content-center mt-4">
                {deck.map((card, index) => (
                    <div
                        key={index}
                        style={{
                            width: 100,
                            height: 150,
                            background: "purple",
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: 10,
                            borderRadius: 8,
                            cursor: "pointer",
                            fontSize: 24,
                        }}
                    >
                        🔮
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewReading;
