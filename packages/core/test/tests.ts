import { user } from '../model/user';
import { RError } from '../declare/error';


async function run() {
	try {
		console.log(await user.getbyId(1));
	} catch (err: RError | any) {
        if (err.errorType === 'exist') {
            console.log('exist username');
        }
    }
}

run();
