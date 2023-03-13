import { Modal, Stepper, Title, UnstyledButton, Checkbox, Text, createStyles, Flex, Button, useMantineTheme, Group } from "@mantine/core";
import { Dropzone } from '@mantine/dropzone';
import { useState } from "react";
import { useUncontrolled } from '@mantine/hooks';
import Right from '@material-symbols/svg-400/outlined/chevron_right.svg';
import Left from '@material-symbols/svg-400/outlined/chevron_left.svg';
import Upload from '@material-symbols/svg-400/outlined/upload.svg';
import Music from '@material-symbols/svg-400/outlined/music_note.svg';
import Close from '@material-symbols/svg-400/outlined/close.svg';

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

export default function UploadSongModal(props: {opened: boolean, close: () => void}) {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const [songChecked, setSongChecked] = useState(true);
  const [file, setFile] = useState<any>();
  const [title, setTitle] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [album, setAlbum] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [numCopiesStr, setNumCopies] = useState<string>("");
  const [pricePerUnitStr, setPricePerUnit] = useState<string>("");
  const [songFile, setSongFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const theme = useMantineTheme();

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
                setFile(files[0])
                nextStep()
              }}
              maxSize={10 * 1024 ** 2}
              accept={['audio/mpeg']}
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
                  Next
              </Button>
            </Flex>
          </div>
        </Stepper.Step>
        <Stepper.Step label="Cover" description="Add a song cover image">
          <div className="mt-10">
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
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>
    </Modal>
  )
}