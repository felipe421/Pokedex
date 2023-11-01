const Fab = [
    // { icon: 'plus', onPress: () => console.log('Pressed add') },
    {
        icon: 'order-alphabetical-ascending',
        label: 'Ordenar por...',
        labelStyle: {
            backgroundColor: 'white',
            padding: 5,
            fontSize: 17, fontWeight: '600',
            borderRadius: 5, borderWidth: 1,
        },
        onPress: () => console.log('Order A-z'),
    },
    {
        icon: 'filter-outline',
        label: 'Filtrar por nome',
        labelStyle: {
            backgroundColor: 'white',
            padding: 5,
            fontSize: 17, fontWeight: '600',
            borderRadius: 5, borderWidth: 1,
        },
        onPress: () => console.log('Order Name'),
    },
    {
        icon: 'card-search-outline',
        label: 'Pesquisar tudo',
        labelStyle: {
            backgroundColor: 'white',
            padding: 5,
            fontSize: 17, fontWeight: '600',
            borderRadius: 5, borderWidth: 1,
        },
        onPress: () => console.log('Search All'),
    },
]

export { Fab }