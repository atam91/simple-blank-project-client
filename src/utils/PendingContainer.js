export default function PendingContainer(_pending = false) {
    let pending = _pending;

    const isPending = () => pending;

    const startPending = () => {
        pending = true;
    };

    const afterPendingJobs = [];
    const addAfterPendingJob = (job) => {
        if (pending) {
            afterPendingJobs.push(job);
        } else {
            job();
        }
    };

    const finishPending = () => {
        pending = false;

        while (afterPendingJobs.length) {
            const job = afterPendingJobs.shift();
            job();
        }
    };

    return {
        isPending,
        startPending,
        finishPending,
        addAfterPendingJob
    };
}
