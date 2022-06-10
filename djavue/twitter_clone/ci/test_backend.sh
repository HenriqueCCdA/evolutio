#!/bin/bash
docker-compose -f docker/compose/test.yml run twitter_clone unittests.sh
exitcode=$?
docker-compose -f docker/compose/test.yml down
exit $exitcode
