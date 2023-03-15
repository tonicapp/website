import { Modal, Stepper, Title, UnstyledButton, Checkbox, Text, createStyles, Flex, Button, useMantineTheme, Group, TextInput, Autocomplete, Image, FileButton, NumberInput } from "@mantine/core";
import { Dropzone } from '@mantine/dropzone';
import { useEffect, useState } from "react";
import { useUncontrolled, useInputState } from '@mantine/hooks';
import Right from '@material-symbols/svg-400/outlined/chevron_right.svg';
import Left from '@material-symbols/svg-400/outlined/chevron_left.svg';
import Upload from '@material-symbols/svg-400/outlined/upload.svg';
import Music from '@material-symbols/svg-400/outlined/music_note.svg';
import Close from '@material-symbols/svg-400/outlined/close.svg';

// @ts-ignore
import jsmediatags from 'jsmediatags';
import { useWallet } from "@solana/wallet-adapter-react";

const useStyles = createStyles((theme) => ({
  button: {
    display: 'flex',
    width: '100%',
    border: `4 solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
  },
}));

interface CheckboxCardProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  title: React.ReactNode;
  description: React.ReactNode;
  disabled?: boolean;
}

export function CheckboxCard({
  checked,
  defaultChecked,
  onChange,
  title,
  description,
  className,
  disabled,
  ...others
}: CheckboxCardProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof CheckboxCardProps>) {
  const { classes, cx } = useStyles();

  const [value, handleChange] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange,
  });

  return (
    <UnstyledButton
      {...others}
      onClick={() => handleChange(!value)}
      className={cx(classes.button, className)}
    >
      <Checkbox
        checked={value}
        onChange={() => {}}
        tabIndex={-1}
        size="md"
        mr="xl"
        disabled={disabled}
        styles={{ input: { cursor: 'pointer' } }}
      />

      <div>
        <Text fw={500} mb={7} sx={{ lineHeight: 1 }}>
          {title}
        </Text>
        <Text fz="sm" c="dimmed">
          {description}
        </Text>
      </div>
    </UnstyledButton>
  );
}

const genres = ["Acapella","Acid","Acid Jazz","Acid Punk","Acoustic","Alternative","Alternative Rock","Ambient","Anime","Avantgarde","Ballad","Bass","Beat","Bebob","Big Band","Black Metal","Bluegrass","Blues","Booty Bass","BritPop","Cabaret","Celtic","Chamber Music","Chanson","Chorus","Christian Gangsta Rap","Christian Rap","Christian Rock","Classic Rock","Classical","Club","Club - House","Comedy","Contemporary Christian","Country","Crossover","Cult","Dance","Dance Hall","Darkwave","Death Metal","Disco","Dream","Drum & Bass","Drum Solo","Duet","Easy Listening","Electronic","Ethnic","Euro-House","Euro-Techno","Eurodance","Fast Fusion","Folk","Folk-Rock","Folklore","Freestyle","Funk","Fusion","Game","Gangsta","Goa","Gospel","Gothic","Gothic Rock","Grunge","Hard Rock","Hardcore","Heavy Metal","Hip-Hop","House","Humour","Indie","Industrial","Instrumental","Instrumental Pop","Instrumental Rock","JPop","Jazz","Jazz+Funk","Jungle","Latin","Lo-Fi","Meditative","Merengue","Metal","Musical","National Folk","Native US","Negerpunk","New Age","New Wave","Noise","Oldies","Opera","Polka","Polsk Punk","Pop","Pop-Folk","Pop/Funk","Porn Groove","Power Ballad","Pranks","Primus","Progressive Rock","Psychadelic","Psychedelic Rock","Punk","Punk Rock","R&B","Rap","Rave","Reggae","Retro","Revival","Rhythmic Soul","Rock","Rock & Roll","Salsa","Samba","Satire","Showtunes","Ska","Slow Jam","Slow Rock","Sonata","Soul","Sound Clip","Soundtrack","Southern Rock","Space","Speech","Swing","Symphonic Rock","Symphony","Synthpop","Tango","Techno","Techno-Industrial","Terror","Thrash Metal","Trailer","Trance","Tribal","Trip-Hop","Vocal","Other"]

export default function UploadSongModal(props: {opened: boolean, close: () => void}) {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const [songChecked, setSongChecked] = useState(true);
  const [title, setTitle] = useInputState("")
  const [artist, setArtist] = useInputState("")
  const [album, setAlbum] = useInputState("")
  const [genre, setGenre] = useInputState("")
  const [numCopies, setNumCopies] = useState<number | undefined>(0)
  const [pricePerUnit, setPricePerUnit] = useState<number | undefined>(0)
  const [songFile, setSongFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const theme = useMantineTheme();

  const { publicKey } = useWallet()

  const handleSubmit = (formData: FormData) => {
    fetch("http://localhost:3333/api/uploadsong", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to upload song");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onSubmit = () => {
    const TONIC_CUT = 0.1;  // 10% of initial sale
    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("album", album);
    formData.append("genre", genre);
    formData.append("artistPubKeyStr", publicKey!.toString());
    formData.append("numCopiesStr", numCopies + "");
    formData.append("tonicCutStr", TONIC_CUT.toString());
    formData.append("pricePerUnitStr", pricePerUnit + "");
    if (songFile) {
      formData.append("songFile", songFile);
    }
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }
    handleSubmit(formData);
  }

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile)
      setImagePreview(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [imageFile])

  return (
    <Modal opened={props.opened} onClose={props.close} size="xl" centered radius="xl">
      <Title className="text-center mb-5">Add new content</Title>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm" allowNextStepsSelect={false} className="px-10 pt-5 pb-10">
        <Stepper.Step label="Content" description="Pick the type of content" >
          <div className="mt-10">
            <Flex className="space-x-5">
              <CheckboxCard checked={songChecked} defaultChecked={true} onChange={(val) => setSongChecked(val)} title="Song" description="Upload a song" />
              <CheckboxCard checked={false} defaultChecked={false} onChange={() => {}} title="Albums" description="Coming Soon" disabled/>
            </Flex>
            <Flex justify="end" className="mt-20">
              <Button 
                variant="gradient" 
                radius={50} 
                size="md" 
                gradient={{ from: '#3D39ED', to: '#0073FC' }} 
                rightIcon={<Right className="h-5 w-5 fill-white" />} 
                onClick={nextStep}>
                  Next
              </Button>
            </Flex>
          </div>
        </Stepper.Step>
        <Stepper.Step label="Upload" description="Upload your music">
          <div className="mt-10">
            <Dropzone
              onDrop={(files) => {
                setSongFile(files[0])
                jsmediatags.read(files[0], {
                  onSuccess: function(tag: any) {
                    setTitle(tag.tags.title ? tag.tags.title : null);
                    setArtist(tag.tags.artist ? tag.tags.artist : null);
                    setAlbum(tag.tags.album ? tag.tags.album : null);
                  },
                  onError: function(error: any) {
                    console.log(error);
                  }
                })
                nextStep()
              }}
              maxSize={10 * 1024 ** 2}
              accept={['audio/mpeg', 'audio/mp3', 'audio/wav']}
              {...props}
            >
              <Group position="center" spacing="xl" className="pointer-events-none" mih={200}>
                <Dropzone.Accept>
                  <Upload
                    size="3.2rem"
                    className={`${theme.colorScheme == "dark" ? "fill-white" : "fill-black"}`}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <Close
                    size="3.2rem"
                    className="fill-red-500"
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <Music size="3.2rem" className={`${theme.colorScheme == "dark" ? "fill-white" : "fill-black"}`}/>
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag your song here or click to select a song
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    File should not exceed 10mb
                  </Text>
                </div>
              </Group>
            </Dropzone>

            <Flex justify="start" className="mt-20">
              <Button 
                variant="outline"
                color="gray"
                radius={50} 
                size="md" 
                leftIcon={<Left className="h-5 w-5 fill-white" />} 
                onClick={prevStep}>
                  Back
              </Button>
            </Flex>
          </div>
        </Stepper.Step>
        <Stepper.Step label="Metadata" description="Add relavent metadata">
          <div className="mt-10">
            <Flex className="space-x-10">
              <Flex direction="column" align="center" className="space-y-3">
                <Image width={200} height={200} src={imagePreview} withPlaceholder alt="image cover"/>
                <FileButton onChange={(file) => {
                  setImageFile(file)
                }}
                accept="image/png,image/jpeg">
                  {(props) => 
                  <Button
                    {...props}
                    variant="gradient" 
                    radius={50} 
                    size="xs" 
                    gradient={{ from: '#3D39ED', to: '#0073FC' }} 
                  >
                      Upload Image
                  </Button>}
                </FileButton>
              </Flex>
              <div>
                <Flex className="space-x-10">
                  <TextInput label="Title" value={title} placeholder="Song Title" onChange={setTitle}/>
                  <TextInput label="Artist" value={artist} placeholder="Artist/Group Name" onChange={setArtist}/>
                </Flex>
                <Flex className="space-x-10">
                  <TextInput label="Album" value={album} placeholder="Album Name (optional)" onChange={setTitle}/>
                  <Autocomplete
                    label="Genre" 
                    placeholder="Type to search" 
                    value={genre} 
                    data={genres} 
                    onChange={setGenre}
                    limit={5}
                    dropdownPosition="bottom" 
                    nothingFound="Use other instead"
                  />
                </Flex>
                <NumberInput 
                  label="Number of Copies" 
                  placeholder="0" 
                  value={numCopies}
                  onChange={setNumCopies}
                />
                <NumberInput
                  label="Price per Unit" 
                  placeholder="0" 
                  value={pricePerUnit}
                  onChange={setPricePerUnit}
                  precision={2}
                  hideControls
                />
              </div>
            </Flex>
            <Flex justify="space-between" className="mt-20">
              <Button 
                variant="outline"
                color="gray"
                radius={50} 
                size="md" 
                leftIcon={<Left className="h-5 w-5 fill-white" />} 
                onClick={prevStep}>
                  Back
              </Button>
              <Button 
                variant="gradient" 
                radius={50} 
                size="md" 
                gradient={{ from: '#3D39ED', to: '#0073FC' }} 
                rightIcon={<Right className="h-5 w-5 fill-white" />} 
                onClick={nextStep}>
                  Submit
              </Button>
            </Flex>
          </div>
        </Stepper.Step>
        <Stepper.Completed>
          <Title>Congratulations on uploading your new song!</Title>
          <Flex justify="space-between" className="mt-20">
            <Button 
              variant="gradient" 
              radius={50} 
              size="md" 
              gradient={{ from: '#3D39ED', to: '#0073FC' }} 
              rightIcon={<Right className="h-5 w-5 fill-white" />} 
              onClick={
                props.close
              }>
                Done
            </Button>
          </Flex>
        </Stepper.Completed>
      </Stepper>
    </Modal>
  )
}