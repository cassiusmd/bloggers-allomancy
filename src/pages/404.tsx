import {Text} from '@mantine/core';

export default function Custom404() {
    return (
        //   mantine not found page
        <>
            <Text size="xl" weight={500} align="center" style={{marginTop: 100}}>Not found</Text>
            {/*<Text size={20} weight={500} align="center" style={{marginTop: 100}}>Not found</Text>*/}
            <Text size={'lg'} align={'center'}>Sorry, this page does not exist</Text>
        </>
    )
}
