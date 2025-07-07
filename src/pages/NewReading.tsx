import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

const NewReading: React.FC = () => {
    const [reason, setReason] = useState("");

    return (
        <div>
            <h2>Nova Tiragem</h2>
            <Form>
                <FormGroup>
                    <Label for="reason">
                        Por que você está fazendo essa tiragem?
                    </Label>
                    <Input
                        type="textarea"
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Ex: Tenho dúvidas sobre meu relacionamento..."
                        rows={3}
                    />
                </FormGroup>
            </Form>
        </div>
    );
};

export default NewReading;
