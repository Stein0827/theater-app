for dir in ../../../databases/*; do
    cd $dir && touch test.txt && cd ../../dev/databases/scripts
done