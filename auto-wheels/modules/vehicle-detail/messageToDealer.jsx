import React from 'react'
import Link from "next/link";

import {
    Button,
    Checkbox,
    Group,
    Text,
    Textarea,
    TextInput,

} from "@mantine/core";
const MessageToDealer = () => {
    return (
        <div className="contact-form">
            <form>
                <div className="row">
                    <div className="col-md-12">
                        <Text
                            size="xl"
                            mb="md"
                            fw={600}
                            className="text-uppercase"
                        >
                            Message to Seller
                        </Text>
                        <Textarea size="md" autosize minRows={10} maxRows={10} />
                    </div>
                    <div className="col-md-4">
                        <TextInput
                            size="md"
                            label="Name"
                            my="md"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="col-md-4">
                        <TextInput
                            my="md"
                            size="md"
                            label="Email"
                            placeholder="your@email.com"
                        />
                    </div>
                    <div className="col-md-4">
                        <TextInput
                            my="md"
                            size="md"
                            label="Phone"
                            placeholder="+91 321 674 9854"
                        />
                    </div>
                    <div className="col-md-12">
                        <Group gap="md" align="center" mb="md">
                            <Checkbox />
                            <Text>
                                I accept the{" "}
                                <Link href="#" className="text-decoration-none">
                                    Privacy Policy
                                </Link>
                            </Text>
                        </Group>
                    </div>
                    <div className="col-md-12">
                        <Button type="submit" size="lg" color="#EB2321">
                            Send Message
                        </Button>
                    </div>
                </div>
            </form>
        </div>)
}

export default MessageToDealer