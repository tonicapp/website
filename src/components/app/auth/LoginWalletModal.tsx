import { Box, Progress, PasswordInput, Group, Text, Center, Modal, TextInput, Tabs, Button, Flex, Divider, Title, Grid } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { IconCheck, IconX } from '@tabler/icons-react';
import  { useState } from 'react'
import WalletButton from '../wallet/WalletButton';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text color={meets ? 'teal' : 'red'} mt={5} size="sm">
      <Center inline>
        {meets ? <IconCheck size="0.9rem" stroke={1.5} /> : <IconX size="0.9rem" stroke={1.5} />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

export default function LoginWalletModal(props: {opened: boolean, close: ()=> void}) {

  const [email, setEmail] = useInputState('');
  const [password, setPassword] = useInputState('');
  const strength = getStrength(password);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(password)} />
  ));

  const bars = Array(4)
  .fill(0)
  .map((_, index) => (
    <Progress
      styles={{ bar: { transitionDuration: '0ms' } }}
      value={
        password.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
      }
      color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
      key={index}
      size={4}
    />
  ));

  const [activeTab, setActiveTab] = useState<string | null>('login');

  return (
    <Modal opened={props.opened} onClose={props.close} size="xl">
      <Grid>
        <Grid.Col span={5}>
          <div>
            <Title className='text-center'>Web2</Title>
            <Tabs value={activeTab} onTabChange={setActiveTab} className='p-10'>
              <Tabs.List className='justify-center'>
                <Tabs.Tab value="login" className='w-1/2'>Log In</Tabs.Tab>
                <Tabs.Tab value="signup" className='w-1/2'>Sign Up</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="login" className='space-y-2'>
                <TextInput
                  value={email}
                  onChange={setEmail}
                  placeholder="Your email"
                  label="Email"
                  autoComplete='email'
                  className='mt-2'
                  required
                />
                <PasswordInput
                  value={password}
                  onChange={setPassword}
                  placeholder="Your password"
                  label="Password"
                  autoComplete='current-password'
                  required
                />
                <Button 
                  variant="gradient" 
                  radius={50} 
                  size="xs" 
                  gradient={{ from: '#3D39ED', to: '#0073FC' }} 
                  onClick={() => {}}>
                    Log In
                </Button>
              </Tabs.Panel>
              <Tabs.Panel value="signup" className='space-y-2'>
                <TextInput
                  value={email}
                  onChange={setEmail}
                  placeholder="Your email"
                  label="Email"
                  autoComplete='email'
                  className='mt-2'
                  required
                />
                <PasswordInput
                  value={password}
                  onChange={setPassword}
                  placeholder="Your password"
                  label="Password"
                  autoComplete='current-password'
                  required
                />
                <PasswordInput
                  value={password}
                  onChange={setPassword}
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  required
                />
                <Group spacing={5} grow mt="xs" mb="md">
                  {bars}
                </Group>
                <PasswordRequirement label="Has at least 6 characters" meets={password.length > 5} />
                {checks}

                <Button 
                  variant="gradient" 
                  radius={50} 
                  size="xs" 
                  gradient={{ from: '#3D39ED', to: '#0073FC' }} 
                  onClick={() => {}}>
                    Sign Up
                </Button>
              </Tabs.Panel>
            </Tabs>
          </div>
        </Grid.Col>
        <Grid.Col span={2}>
          <Divider size="lg" orientation="vertical" />
        </Grid.Col>
        <Grid.Col span={5}>
          <div className='h-full'>
            <Title className='text-center'>Web3</Title>
            <Flex className='h-3/4' justify="center" align="center">
              <WalletButton />
            </Flex>
          </div>
        </Grid.Col>
        
      </Grid>
    </Modal>
  )
}