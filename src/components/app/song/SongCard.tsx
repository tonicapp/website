import { Card, Badge, Text, Image, Group } from "@mantine/core"

export interface ISong {
  name: string,
  artist: string,
  price: {
    value: number,
    currency: string,
  }
  cover: string,
}

export default function SongCard({ name, artist, price, cover }: ISong) {
  return (
    <Card miw={250} radius="xl" withBorder className="shadow-md transition ease-in-out hover:shadow-xl duration-200 delay-75">
      <Card.Section>
        <Image src={cover} width={250} height={200} alt={`${name} by ${artist}'s cover`} withPlaceholder />
      </Card.Section>
      
      <Group position="apart" mt="md">
        <Text weight={500}>{ name }</Text>
        <Badge color="#E7F1FE" variant="light" size="lg">
          {`${ price.value } ${ price.currency }`}
        </Badge>
      </Group>
      <Text weight={200}>{ artist }</Text>

    </Card>
  )
}