import React, { useState, useRef } from 'react';
import { 
  View, 
  FlatList, 
  Dimensions, 
  StyleSheet, 
  Animated,
  TouchableOpacity
} from 'react-native';
import { Layout } from '../../components/shared/Layout';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { spacing, colors, radius } from '../../design/tokens';
import { AuthNavigationProp } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Community Savings',
    description: 'Join hands with your community to save together and reach your goals faster.',
    icon: 'people-outline',
  },
  {
    id: '2',
    title: 'Build Your Credit',
    description: 'Your contribution history helps build your credit score for future financial needs.',
    icon: 'trending-up-outline',
  },
  {
    id: '3',
    title: 'Easy Loans',
    description: 'Get access to community-backed loans with fair rates when you need them most.',
    icon: 'wallet-outline',
  },
];

export const OnboardingScreen = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ 
    viewAreaCoveragePercentThreshold: 20,
    minimumViewTime: 100 
  }).current;

  const { showLoading } = useApp();

  const scrollTo = () => {
    if (currentIndex < SLIDES.length - 1) {
      try {
        slidesRef.current?.scrollToIndex({ 
          index: currentIndex + 1, 
          animated: true 
        });
      } catch (e) {
        // Fallback if scrollToIndex fails (e.g. list not ready)
        setCurrentIndex(prev => prev + 1);
      }
    } else {
      showLoading(1000);
      navigation.navigate('Login');
    }
  };

  const Paginator = () => {
    return (
      <View style={styles.paginatorContainer}>
        {SLIDES.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 24, 10],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={i.toString()}
              style={[styles.dot, { width: dotWidth, opacity }]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <Layout padding={false}>
      <View style={styles.topSection}>
        <TouchableOpacity 
          style={styles.skipButton} 
          onPress={() => navigation.navigate('Login')}
        >
          <Typography variant="label" color={colors.textSecondary}>Skip</Typography>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={SLIDES}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <View style={[styles.iconCircle, { backgroundColor: colors.primaryLight }]}>
                <Ionicons name={item.icon as any} size={80} color={colors.primary} />
              </View>
              <View style={styles.textContainer}>
                <Typography variant="h2" align="center" style={styles.title}>
                  {item.title}
                </Typography>
                <Typography variant="bodyLarge" align="center" color={colors.textSecondary}>
                  {item.description}
                </Typography>
              </View>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />
      </View>

      <View style={styles.footer}>
        <Paginator />
        <Button 
          label={currentIndex === SLIDES.length - 1 ? "Get Started" : "Next"} 
          onPress={() => scrollTo()}
          style={styles.button}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  topSection: {
    paddingHorizontal: spacing.xl,
    alignItems: 'flex-end',
    height: 60,
    justifyContent: 'center',
  },
  skipButton: {
    padding: spacing.sm,
  },
  slide: {
    width,
    alignItems: 'center',
    paddingHorizontal: spacing['3xl'],
  },
  iconCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 60,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    marginBottom: spacing.md,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['4xl'],
    alignItems: 'center',
  },
  paginatorContainer: {
    flexDirection: 'row',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: colors.primary,
  },
  button: {
    width: '100%',
  },
});
