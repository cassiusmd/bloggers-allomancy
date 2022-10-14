import {Center, Text} from '@mantine/core';

export default function Custom404() {
    return (
        //   mantine not found page
        <Center pt={100}>
            <div>
                <Text size="xl" weight={500} align="center" style={{marginTop: 100}}>Not found</Text>
                {/*<Text size={20} weight={500} align="center" style={{marginTop: 100}}>Not found</Text>*/}
                <Text size={'lg'} align={'center'}>Sorry, this page does not exist</Text>
            </div>
        </Center>
    )
}
