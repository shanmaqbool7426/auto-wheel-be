import { Title, Accordion, Text } from "@mantine/core";
import React from "react";

const FAQ = ({ title, titleSpan }) => {
  const faq = [
    {
      index: 1,
      title: "Which is the lowest priced model of Toyota in Pakistan?",
      value: "faq-1",
      description:
        "Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.",
    },
    {
      title: "Which is the highest-priced model of Toyota in Pakistan?",
      value: "faq-2",
      description:
        "Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.",
    },
    {
      title: "Which are the upcoming car models of Toyota in Pakistan?",
      value: "faq-3",
      description:
        "Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.",
    },
    {
      title: "Which is the most fuel efficient car model of Toyota?",
      value: "faq-4",
      description:
        "Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.",
    },
    {
      title: "Which are the most popular Toyota Cars in Pakistan?",
      value: "faq-5",
      description:
        "Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.",
    },
    {
      title: "Are the Toyota Car parts easily available in Pakistan?",
      value: "faq-6",
      description:
        "Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.",
    },
  ];

  // See groceries data above

  return (
    <section className="brands-faq-section pb-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Title order={2} mb="xl">
              {title ? title : " Toyota Car FAQs"}{" "}
              {titleSpan && (
                <Text span inherit className="text-primary">
                  {titleSpan}
                </Text>
              )}
            </Title>
          </div>
          <div className="col-md-12">
            <Accordion
              variant="contained"
              radius="sm"
              chevronPosition="right"
              defaultValue="faq-1"
            >
              {faq.map((item, _) => (
                <Accordion.Item key={item.index++} value={item.title}>
                  <Accordion.Control px="lg" py="xs">
                    <Title order={5} fw={600}>
                      {item.title}
                    </Title>
                  </Accordion.Control>
                  <Accordion.Panel>{item.description}</Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
